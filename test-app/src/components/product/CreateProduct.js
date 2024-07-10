import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default function CreateProduct() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        api.post('products', inputs).then(function(response){
            console.log(response.data);
            navigate('/products');
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col>
                    <h1 className="text-center my-5">Create product</h1>
                </Col>
            </Row>
            {loading ? (
                <Row className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            ) : (
                <Form id="productForm" onSubmit={handleSubmit}>
                    <Row className="justify-content-md-center">
                        <Form.Group className="mb-3" controlId="productForm.name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" name="name" placeholder="product name" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="productForm.description">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" onChange={handleChange}  />
                        </Form.Group>
                        <Form.Group className="mb-3 col-6" controlId="productForm.price">
                            <Form.Label>Price:</Form.Label>
                            <Form.Control type="number" name="price" placeholder="price" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3 col-6" controlId="productForm.stock">
                            <Form.Label>Stock:</Form.Label>
                            <Form.Control type="number" name="stock" placeholder="stock" onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Row className="row row-cols-auto justify-content-end">
                        <Col>
                            <Button variant="outline-success" type="submit">Save</Button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Container>
    )
}
