import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 12px 0;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2023 Mentorship. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
