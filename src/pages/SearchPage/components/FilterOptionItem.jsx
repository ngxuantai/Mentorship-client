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

export default function FilterOptionItem({ onItemClick }) {
  return (
    <div
      onClick={() => onItemClick("Skill")}
      style={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        justifyContent: "start",
        width: "100%",
      }}
      onMouseOver={(e) => e.stopPropagation()}
      className="button-effect"
    >
      <p style={{ margin: 0 }}>Skill </p>
    </div>
  );
}
