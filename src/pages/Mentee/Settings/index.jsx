import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import styled from "styled-components";
import Payment from "./components/Payment";

import Profiles from "./components/Profiles";

export default function MenteeSettings() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div style={{ margin: "auto" }}>
      <Container>
        <Tabs
          value={value}
          onChange={handleChange}
          style={{ fontWeight: "bold", padding: "0 14rem" }}
        >
          <Tab label="Thông tin cá nhân" value={0} />
          <Tab label="Thanh toán" value={1} />
          <Tab label="Thống kê" value={2} />
        </Tabs>
        {value === 0 && <Profiles />}
        {value === 1 && <Payment />}
        {value === 2 && <Profiles />}
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
