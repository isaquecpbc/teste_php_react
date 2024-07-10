import { useEffect, useState } from "react";
import api from "../../services/api";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const formatCNPJ = (cnpj) => {
    return cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5"
    );
};

export default function ListCustomers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        getCustomers();
    }, []);

    function getCustomers() {
        setLoading(true);
        api.get('customers/').then(function(response) {
            console.log(response.data.message);
            setCustomers(response.data.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }

    const handleDeleteClick = (id) => {
        setSelectedCustomerId(id);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCustomerId(null);
    }

    const handleConfirmDelete = (id) => {
        setDeleting(true);
        api.delete(`customers/${id}`).then(function(response){
            console.log(response.data.message);
            getCustomers();
            handleCloseModal();
        }).finally(() => {
            setDeleting(false);
        });
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col>
                    <h1 className="text-center my-5">List Customers</h1>
                </Col>
            </Row>
            <Row className="my-2">
            {loading ? (
                <Row className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            ) : (
                customers.map((customer, key) =>
                    <Col key={key} className="col-12 mb-3">
                        <Card bg="light" border="info" className="mb-3text-center">
                            <Card.Header>{formatCNPJ(customer.cnpj)}</Card.Header>
                            <Card.Body>
                                <Card.Title>{customer.reason_social}</Card.Title>
                                <Card.Text>
                                    {customer.email}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Row className="row row-cols-auto justify-content-end">
                                    <Col>
                                        <Card.Link href={`customer/${customer.id}/edit`}>Edit</Card.Link>
                                    </Col>
                                    <Col>
                                        <Card.Link 
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteClick(customer.id)}
                                        >Delete</Card.Link>
                                    </Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </Col>
                )
            )}
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
                    <Button variant="danger" onClick={() => handleConfirmDelete(selectedCustomerId)} disabled={deleting}>
                        {deleting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Delete'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
