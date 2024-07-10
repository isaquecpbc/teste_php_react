import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './App.css';

import CreateProduct from './components/product/CreateProduct';
import EditProduct from './components/product/EditProduct';
import ListProducts from './components/product/ListProducts';
import CreateCustomer from './components/customer/CreateCustomer';
import EditCustomer from './components/customer/EditCustomer';
import ListCustomers from './components/customer/ListCustomers';
import CreateOrder from './components/order/CreateOrder';
import ListOrders from './components/order/ListOrders';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">Teste de CRUD de Produto e Pedido</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* Nav Products */}
                <NavDropdown title="Products" id="nav-Products">
                  <NavDropdown.Item href="/products">List</NavDropdown.Item>
                  <NavDropdown.Item href="/products/create">
                    New Product
                  </NavDropdown.Item>
                </NavDropdown>
                {/* Nav Customers */}
                <NavDropdown title="Customers" id="nav-Customers">
                  <NavDropdown.Item href="/customers">List</NavDropdown.Item>
                  <NavDropdown.Item href="/customers/create">
                    New Customer
                  </NavDropdown.Item>
                </NavDropdown>
                {/* Nav Orders */}
                <NavDropdown title="Orders" id="nav-Orders">
                  <NavDropdown.Item href="/orders">List</NavDropdown.Item>
                  <NavDropdown.Item href="/orders/create">
                    New Order
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route index element={<Home />} />
          {/* Route Products */}
          <Route path="/products" element={<ListProducts />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/product/:id/edit" element={<EditProduct />} />
          {/* Route Customers */}
          <Route path="/customers" element={<ListCustomers />} />
          <Route path="/customers/create" element={<CreateCustomer />} />
          <Route path="/customer/:id/edit" element={<EditCustomer />} />
          {/* Route Orders */}
          <Route path="/orders" element={<ListOrders />} />
          <Route path="/orders/create" element={<CreateOrder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
