import { useEffect, useState } from "react";
import api from "../../services/api";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function ListProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    function getProducts() {
        setLoading(true);
        api.get('products/').then(function(response) {
            console.log(response.data.message);
            setProducts(response.data.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }

    const handleDeleteClick = (id) => {
        setSelectedProductId(id);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProductId(null);
    }

    const handleConfirmDelete = () => {
        setDeleting(true);
        api.delete(`products/${selectedProductId}`).then(function(response){
            console.log(response.data.message);
            getProducts();
            handleCloseModal();
        }).finally(() => {
            setDeleting(false);
        });
    }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col>
                    <h1 className="text-center my-5">List Products</h1>
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
                products.map((product, key) =>
                    <Col key={key} className="col-4">
                        <Card bg="light" border="dark" className="mb-3">
                            <Card.Img variant="top" src="holder.js/300x200" />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">R$ {product.price}</Card.Subtitle>
                                <Card.Text>
                                    {truncateText(product.description, 50)}
                                </Card.Text>
                                <Row className="row row-cols-auto justify-content-end">
                                    <Col>
                                        <Card.Link href={`product/${product.id}/edit`}>Edit</Card.Link>
                                    </Col>
                                    <Col>
                                        <Card.Link 
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteClick(product.id)}
                                        >Delete</Card.Link>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            )}
            </Row>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal} disabled={deleting}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete} disabled={deleting}>
                        {deleting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Delete'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
