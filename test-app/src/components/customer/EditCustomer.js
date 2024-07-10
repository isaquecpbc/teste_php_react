import React, { useState, useEffect, useRef } from 'react';
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default function EditCustomer() {
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
        getCustomer();
    }, []);

    function getCustomer() {
        setLoading(true);
        api.get(`customers/${id}`).then(function (response) {
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

        api.put(`customers/${id}`, inputs).then(function (response) {
            console.log(response.data.message);
            navigate('/customers');
        }).finally(() => {
            setSaving(false);
        });
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col>
                    <h1 className="text-center my-5">Edit Customer</h1>
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
                    <Form id="customerForm" onSubmit={handleSubmit}>
                        <Row className="justify-content-md-center">
                            <Form.Group className="col-12 mb-3" controlId="customerForm.description">
                                <Form.Label>Reason Social:</Form.Label>
                                <Form.Control value={inputs.reason_social || ''} type="text" name="reason_social" placeholder="reason social" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="col-6 mb-3" controlId="customerForm.description">
                                <Form.Label>CNPJ Digits:</Form.Label>
                                <Form.Control value={inputs.cnpj || ''} type="text" name="cnpj" placeholder="CNPJ" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="col-6 mb-3" controlId="customerForm.description">
                                <Form.Label>E-mail:</Form.Label>
                                <Form.Control value={inputs.email || ''} type="text" name="email" placeholder="E-mail" onChange={handleChange} />
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
