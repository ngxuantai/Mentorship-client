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
import { BsChevronDown } from "react-icons/bs";

export default function FilterOptionItem({}) {
  return (
    <div
      style={{
        marginRight: 24,
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingRight: 18,
        paddingLeft: 18,
        borderRadius: 24,
        justifyContent: "start",
        border: "1px solid gray",
        width: "auto",
      }}
      className="button-effect"
      onClick={null}
    >
      <p style={{ margin: 0, marginRight: 8, fontWeight: "bold" }}>
        Filter name
      </p>
      <BsChevronDown fontSize={16}></BsChevronDown>
    </div>
  );
}
