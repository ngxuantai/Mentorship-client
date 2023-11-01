import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

type AboutYouPageProps = {
  onButtonClick: (page: string) => void;
};
function AboutYouPage({ onButtonClick }: AboutYouPageProps) {
  return (
    <div
      style={{
        width: "50%",
        paddingTop: 50,
        margin: "0 auto",
      }}
    >
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label style={{ fontWeight: "bold", color: "gray" }}>
            Tell your mentor a little bit about yourself
          </Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <p style={{ color: "gray" }}>Think of this is a quick overview</p>
        <Button
          variant="secondary"
          className="float-end"
          style={{
            fontWeight: "bold",
            borderRadius: "4px",
            textAlign: "center",
          }}
          onClick={() => onButtonClick("pagetwo")}
        >
          Next Step
        </Button>
      </Form>
    </div>
  );
}

export default AboutYouPage;
