import { useEffect, useState } from "react";
import api from "../../services/api";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const formatCNPJ = (cnpj) => {
    return cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5"
    );
};

export default function ListOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        getOrders();
    }, []);

    function getOrders() {
        setLoading(true);
        api.get('orders/').then(function(response) {
            console.log(response.data.message);
            setOrders(response.data.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }

    const handleDeleteClick = (id) => {
        setSelectedOrderId(id);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrderId(null);
    }

    const handleConfirmDelete = () => {
        setDeleting(true);
        api.delete(`orders/${selectedOrderId}`).then(function(response){
            console.log(response.data.message);
            getOrders();
            handleCloseModal();
        }).finally(() => {
            setDeleting(false);
        });
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col>
                    <h1 className="text-center my-5">List Orders</h1>
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Customer</th>
                        <th>CNPJ</th>
                        <th>Total price</th>
                        <th className="text-center">-</th>
                        </tr>
                    </thead>
                    <tbody>
            {loading ? (
                <tr className="justify-content-center align-items-center">
                    <td className="text-center" colSpan={5}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </td>
                </tr>
            ) : (
                orders.map((order, key) =>
                    <tr key={key}>
                        <td>{order.id}</td>
                        <td>{order.customer.reason_social}</td>
                        <td>{formatCNPJ(order.customer.cnpj)}</td>
                        <td>R$ {order.total_price}</td>
                        <td className="text-center">
                            <Button 
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteClick(order.id)}
                            >Delete</Button>
                        </td>
                    </tr>
                )
            )}
                    </tbody>
                </Table>
            </Row>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this customer?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal} disabled={deleting}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleConfirmDelete(selectedOrderId)} disabled={deleting}>
                        {deleting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Delete'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
