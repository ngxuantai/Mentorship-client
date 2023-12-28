import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import styled from "styled-components";
import Statistic from "../Statistic";
import Payment from "./components/Payment";
import Plan from "./components/Plan";

import Profiles from "./components/Profiles";

export default function MentorSettings() {
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
          <Tab label="Gói học" value={1} />
          <Tab label="Thanh toán" value={2} />
          <Tab label="Thống kê" value={3} />
        </Tabs>
        {value === 0 && <Profiles />}
        {value === 1 && <Plan />}
        {value === 2 && <Payment />}
        {value === 3 && <Statistic />}
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
