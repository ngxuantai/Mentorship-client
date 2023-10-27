import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Settings() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Tabs value={value} onChange={handleChange} style={{padding: '0 14rem'}}>
        <Tab label="Item One">
          <h1>1111111</h1>
        </Tab>
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
