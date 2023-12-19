import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router";
import styled from "styled-components";
import "../css/index.css";

const Text = styled.p`
  padding: 8px 12px;
  font-weight: 500;
`;
const Action = styled.p`
  font-weight: 500;
  margin: 0;
  padding: 4px;
`;

function Header() {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    // await firebaseInstance.signOut();
    // navigate("");
  };
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
            <Nav.Link href="#home">Trang chủ</Nav.Link>
            <Nav.Link href="/mentee/applications">Ứng dụng</Nav.Link>
            <Nav.Link href="/mentee/inquires">Yêu cầu</Nav.Link>
            <Nav.Link href="/mentee/wishlist">Danh sách mong muốn</Nav.Link>
            <Nav.Link href="/settings">Cài đặt</Nav.Link>
          </Nav>
          <Nav
            className="ml-auto"
            style={{ alignItems: "center", fontWeight: "bold", height: 50 }}
          >
            <Nav.Link href="#link">Mời bạn bè</Nav.Link>
            <NavDropdown
              style={{}}
              title={
                <img
                  src="https://picsum.photos/200"
                  alt="Trần Khánh"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 20,
                  }}
                />
              }
              id="basic-nav-dropdown"
              className="menu-right"
            >
              <Text>Đã đăng nhập với jbkhanhtran@gmail.com</Text>
              <NavDropdown.Divider />

              <NavDropdown.Item href="#action/3.1">
                <Action>Hồ sơ</Action>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <Action>Đơn đăng ký</Action>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={handleSignOut}
                style={{ color: "tomato" }}
                href="#action/3.4"
              >
                <Action>Đăng xuất</Action>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
