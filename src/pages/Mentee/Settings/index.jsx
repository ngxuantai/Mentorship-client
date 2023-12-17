import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Profiles from "./components/Profiles";

export default function Settings() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Tabs
        value={value}
        onChange={handleChange}
        style={{ padding: "0 14rem" }}
      >
        <Tab label="Item One" value={0} />
        <Tab label="Item Two" value={1} />
        <Tab label="Item Three" value={2} />
      </Tabs>
      {value === 0 && <Profiles />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
