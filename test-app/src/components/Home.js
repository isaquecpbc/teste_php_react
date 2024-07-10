import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomCallout from './utils/CustomCallout';

export default function ListProduct() {

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col>
                    <h1 className="text-center my-5">Welcome!</h1>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col>
                    <p className="text-start">Seja bem vindo ao projeto de: </p>
                    <CustomCallout variant="info">
                        <strong>Desenvolvedor NODE/PHP PLENO</strong> - Teste de CRUD de Produto e Pedido.
                    </CustomCallout>
            
                </Col>
            </Row>
        </Container>
    )
}
