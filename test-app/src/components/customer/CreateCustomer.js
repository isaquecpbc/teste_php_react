import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import InputMask from 'react-input-mask';


export default function CreateCustomer() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        input_cnpj: '',
        reason_social: '',
        cnpj: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'input_cnpj') {
            const cleanedValue = value.replace(/\D/g, '');
            setInputs((prevInputs) => ({
                ...prevInputs,
                input_cnpj: cleanedValue
            }));
    
            if (cleanedValue.length === 14) {
                setLoading(true);
                api.get(`https://publica.cnpj.ws/cnpj/${cleanedValue}`).then((response) => {
                    const data = response.data;
                    setInputs((prevInputs) => ({
                        ...prevInputs,
                        reason_social: data.razao_social,
                        cnpj: data.estabelecimento.cnpj,
                        email: data.estabelecimento.email
                    }));
                }).catch((error) => {
                    console.error("Error fetching CNPJ data: ", error);
                }).finally(() => {
                    setLoading(false);
                });
            }
        } else {
            setInputs((prevInputs) => ({
                ...prevInputs,
                [name]: value
            }));
        }
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        api.post('customers', inputs).then(function(response){
            console.log(response.data);
            navigate('/customers');
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col>
                    <h1 className="text-center my-5">Create customer</h1>
                </Col>
            </Row>
            {loading ? (
                <Row className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            ) : (
                <Form id="customerForm" onSubmit={handleSubmit}>
                    <Row className="justify-content-md-center">
                        <Form.Group className="mb-3" controlId="customerForm.input_cnpj">
                            <Form.Label>CNPJ:</Form.Label>
                            <InputMask
                                mask="99.999.999/9999-99"
                                maskChar="_"
                                value={inputs.input_cnpj}
                                onChange={handleChange}
                            >
                                {(inputProps) => <Form.Control {...inputProps} type="text" name="input_cnpj" placeholder="Digite aqui o CNPJ" onChange={handleChange} />}
                            </InputMask>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="customerForm.description">
                            <Form.Label>Reason Social:</Form.Label>
                            <Form.Control value={inputs.reason_social || ''} type="text" disabled readOnly name="reason_social" placeholder="reason social" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="customerForm.description">
                            <Form.Label>CNPJ Digits:</Form.Label>
                            <Form.Control value={inputs.cnpj || ''} type="text" disabled readOnly name="cnpj" placeholder="CNPJ" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="customerForm.description">
                            <Form.Label>E-mail:</Form.Label>
                            <Form.Control value={inputs.email || ''} type="text" disabled readOnly name="email" placeholder="E-mail" onChange={handleChange} />
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
