import React, { useState, useEffect, useRef } from 'react';
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default function EditProduct() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const isMounted = useRef(true);

    const { id } = useParams();

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        getProduct();
    }, []);

    function getProduct() {
        setLoading(true);
        api.get(`products/${id}`).then(function (response) {
                if (isMounted.current) {
                console.log(response.data.message);
                setInputs(response.data.data);
                setLoading(false);
            }
        }).catch(() => {
            setLoading(false);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSaving(true);

        api.put(`products/${id}`, inputs).then(function (response) {
            console.log(response.data.message);
            navigate('/products');
        }).finally(() => {
            setSaving(false);
        });
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col>
                    <h1 className="text-center my-5">Edit Product</h1>
                </Col>
            </Row>
            {loading ? (
                <Row className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            ) : (
                saving ? (
                    <Row className="justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Saving...</span>
                        </Spinner>
                    </Row>
                ) : (
                    <Form id="productForm" onSubmit={handleSubmit}>
                        <Row className="justify-content-md-center">
                            <Form.Group className="mb-3" controlId="productForm.name">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control value={inputs.name || ''} type="text" name="name" placeholder="product name" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productForm.description">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control as="textarea" rows={3} value={inputs.description || ''} name="description" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-6" controlId="productForm.price">
                                <Form.Label>Price:</Form.Label>
                                <Form.Control value={inputs.price || ''} type="text" name="price" placeholder="price" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-6" controlId="productForm.stock">
                                <Form.Label>Stock:</Form.Label>
                                <Form.Control value={inputs.stock || ''} type="text" name="stock" placeholder="stock" onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <Row className="row row-cols-auto justify-content-end">
                            <Col>
                                <Button variant="outline-success" type="submit">Save</Button>
                            </Col>
                        </Row>
                    </Form>
                )
            )}
        </Container>
    )
}
