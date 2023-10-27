import {
  Form,
  FormControl,
  InputGroup,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import FilterButton from "./FilterButton";
export default function FilterBar({}) {
  const [searchInput, setSearchInput] = useState("");
  return (
    <Container style={{}} className="mt-5">
      <Row
        style={{
          marginTop: 8,
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          width: "auto",
        }}
      >
        <FilterButton></FilterButton>
      </Row>
    </Container>
  );
}
