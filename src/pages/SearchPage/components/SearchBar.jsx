import {
  Form,
  FormControl,
  InputGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "../css/SearchBar.css";
export default function SearchBar() {
  return (
    <Container className="mt-5">
      <Row>
        <Col sm={4}>
          <Form className="d-flex">
            <InputGroup>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2 search-input"
              />
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
