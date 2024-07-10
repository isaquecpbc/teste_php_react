import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';

const formatCNPJ = (cnpj) => {
    return cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5"
    );
};

export default function CreateOrder() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [products, setProducts] = useState([]);
    const [inputs, setInputs] = useState({
        input_stock: 0,
        input_price: "0.00",
        input_product: null // Adicione o estado inicial para input_product
    });

    const addTableRow = () => {
        const productId = inputs.input_product;
        const selectedProduct = products.find(product => product.id === Number(productId));
        const productName = selectedProduct?.name || '-';
        const quantity = inputs.input_stock || '-';
        const totalPrice = inputs.input_price || '-';
    
        const table = document.getElementById('order_details');
        const newRow = table.insertRow(-1);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
    
        cell1.textContent = table.rows.length;
        cell2.textContent = productName;
        cell3.textContent = quantity;
        cell4.textContent = totalPrice;

        const productsOrder = {
            id: selectedProduct?.id,
            quantity: quantity,
            price: totalPrice
        };
        
        setOrderDetails(prevOrderDetails => [...prevOrderDetails, productsOrder]);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (name === 'input_stock') {
            const selectedProductId = inputs.input_product;
            const selectedProduct = products.find(product => product.id === Number(selectedProductId));
    
            if (selectedProduct) {
                const totalPrice = selectedProduct.price * value;
                const formattedPrice = totalPrice.toFixed(2); // Arredonda para 2 casas decimais
                setInputs((prevInputs) => ({
                    ...prevInputs,
                    input_price: formattedPrice,
                    [name]: value, // Atualiza o valor de "input_stock"
                }));
            } else {
                setInputs((prevInputs) => ({
                    ...prevInputs,
                    input_price: "0.00",
                    [name]: value, // Atualiza o valor de "input_stock"
                }));
            }
        } else if (name !== 'input_price') {
            setInputs((prevInputs) => ({
                ...prevInputs,
                [name]: value
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSaving(true);

        const data = {
            customer_id: inputs.customer_id,
            products: orderDetails
        };
        api.post('orders', data).then(function(response) {
            console.log(response.data);
            navigate('/orders');
        }).finally(() => {
            setSaving(false);
        });
    }

    useEffect(() => {
        getDataSelects();
    }, []);
    
    function getDataSelects() {
        setLoading(true);
        // get customers
        api.get('customers/').then(response => {
            if (Array.isArray(response.data.data)) {
                setCustomers(response.data.data);
            } else {
                console.error("Customers data is not an array: ", response.data);
            }
        }).catch(error => {
            console.error("Error fetching customers data: ", error);
        });
        // get products
        api.get('products/').then(response => {
            if (Array.isArray(response.data.data)) {
                setProducts(response.data.data);
                setLoading(false);
            } else {
                console.error("Products data is not an array: ", response.data);
            }
        }).catch(error => {
            console.error("Error fetching products data: ", error);
            setLoading(false);
        });
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col>
                    <h1 className="text-center my-5">Create order</h1>
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
            <Form id="orderForm" onSubmit={handleSubmit}>
                <Row className="justify-content-md-center">
                    <Form.Group className="mb-3 col-12" controlId="orderForm.customer_id">
                        <Form.Label>Customer:</Form.Label>
                        <Form.Select aria-label="customer list" name="customer_id" placeholder="Select a customer" onChange={handleChange}>
                            <option>Open this select customer list</option>
                            {customers.map((customer, key) =>
                                <option key={key} value={customer.id}>{formatCNPJ(customer.cnpj)} | {customer.reason_social}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 col-7" controlId="orderForm.input_product">
                        <Form.Label>Product:</Form.Label>
                        <Form.Select aria-label="products list" name="input_product" placeholder="order name" onChange={handleChange}>
                            <option>Open this select products list</option>
                            {products.map((product, key) =>
                                <option key={key} value={product.id}>{product.name}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 col-2" controlId="orderForm.input_stock">
                        <Form.Label>Stock:</Form.Label>
                        <Form.Control type="number" name="input_stock" placeholder="0" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3 col-3" controlId="orderForm.input_price">
                        <Form.Label>Price:</Form.Label>
                        <InputGroup>
                            <InputGroup.Text id="input_price">R$</InputGroup.Text>
                            <Form.Control type="text" name="input_price" placeholder="0.00" value={inputs.input_price} aria-describedby="input_price" onChange={handleChange} />
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="row row-cols-auto justify-content-end my-5">
                    <Col>
                        <Button variant="outline-info" type="button" id="add_order" onClick={addTableRow}>Add</Button>
                    </Col>
                </Row>
                <hr />
                <Row className="row row-cols-auto justify-content-end my-5">
                    <Table striped bordered hover variant="dark" id="order_details">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>product name</th>
                                <th>quantity</th>
                                <th>total price</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </Table>
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
