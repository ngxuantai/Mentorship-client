import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../css/index.css";
import styled from "styled-components";

const Text = styled.p`
  padding: 8px 4px;
`;

function Header() {
  return (
    <Navbar style={{ width: "100%" }} expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto"
            style={{ alignItems: "center", fontWeight: "bold", height: 50 }}
          >
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#1">Inquiries</Nav.Link>
            <Nav.Link href="#2">Wishlist</Nav.Link>
            <Nav.Link href="#3">Settings</Nav.Link>
          </Nav>
          <Nav
            className="ml-auto"
            style={{ alignItems: "center", fontWeight: "bold", height: 50 }}
          >
            <Nav.Link href="#link">Invite a friend</Nav.Link>
            <NavDropdown
              style={{}}
              title={
                <img
                  src="https://picsum.photos/200"
                  alt="Trần Khánh"
                  style={{ width: 36, height: 36, borderRadius: 20 }}
                />
              }
              id="basic-nav-dropdown"
              className="menu-right"
            >
              <Text>Signed in as jbkhanhtran@gmail.com</Text>
              <NavDropdown.Divider />

              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item style={{ color: "tomato" }} href="#action/3.4">
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
