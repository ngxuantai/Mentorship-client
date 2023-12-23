import Box from "@mui/material/Box";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import "react-step-progress-bar/styles.css";
import styled from "styled-components";
import { useUserStore } from "../../../../store/userStore";
export default function Success() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const handleNavigateHistory = () => {
    navigate("/applications");
  };

  const handleNavigateHome = () => {
    navigate(user?.role === "mentee" ? "/mentee" : "/mentor");
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3
        style={{
          fontWeight: "bold",
          textAlign: "center",
          width: "100%",
          color: "#22bb33",
          marginTop: 12,
        }}
      >
        Ứng tuyển thành công
      </h3>
      <Container>
        <div style={{ width: "100%" }}>
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Button
                onClick={handleNavigateHome}
                className="my-2"
                variant="secondary"
              >
                Quay lại trang chủ
              </Button>

              <Button
                onClick={handleNavigateHistory}
                className="my-2"
                variant="secondary"
              >
                Xem lịch sử ứng tuyển
              </Button>
            </Box>
          </React.Fragment>
        </div>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  gap: 2rem;
  padding: 2rem;
  max-width: 900px;
  width: 90%;
`;
const Text = styled.div`
  font-weight: bold;
  font-size: 16px;
`;
