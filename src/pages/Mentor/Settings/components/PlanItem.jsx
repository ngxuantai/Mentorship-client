import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PlanType } from "../../../../constants/index";
import currencyFormatter from "../../../../utils/moneyConverter";
const PlanItem = ({ plan, onUpdatePlan }) => {
  const [editedPlan, setEditedPlan] = useState(plan);
  const [isPlanModified, setIsPlanModified] = useState(false);

  useEffect(() => {
    const isModified =
      plan.callTimes !== editedPlan.callTimes ||
      plan.price !== editedPlan.price ||
      plan.description !== editedPlan.description;

    setIsPlanModified(isModified);
  }, [plan, editedPlan]);

  const getPlanName = (plan) => {
    switch (plan.name) {
      case PlanType.LITE:
        return "Lite";
      case PlanType.STANDARD:
        return "Standard";
      case PlanType.PRO:
        return "Pro";
      default:
        return "";
    }
  };

  const handleCallTimesChange = (event) => {
    setEditedPlan({
      ...editedPlan,
      callTimes: event.target.value,
    });
  };

  const handlePriceChange = (value) => {
    setEditedPlan({
      ...editedPlan,
      price: value,
    });
  };

  const handleDescriptionChange = (event) => {
    setEditedPlan({
      ...editedPlan,
      description: event.target.value,
    });
  };

  const onInputChange = (event) => {
    const { name, value } = event.tartget;
    setEditedPlan({
      ...editedPlan,
      [name]: value,
    });
  };
  const handleSaveClick = () => {
    // Call the onUpdatePlan function to update the plan in the parent component
    onUpdatePlan(editedPlan);
    setIsPlanModified(false);
  };
  return (
    <Card
      variant="outlined"
      style={{
        marginBottom: "20px",
        boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" style={{ fontWeight: "bold" }}>
          {getPlanName(plan)}
        </Typography>
        <TextField
          label="Số lần gọi mỗi tuần"
          value={editedPlan.callTimes}
          onChange={handleCallTimesChange}
          style={{ marginTop: "10px" }}
        />
        <TextField
          label="Số tuần học"
          name="weeks"
          value={editedPlan.weeks}
          onChange={onInputChange}
          style={{ marginTop: "10px" }}
        />
        <TextField
          label="Học phí"
          value={currencyFormatter(editedPlan.price)}
          onChange={(event) => {
            // Chuyển đổi giá trị nhập vào thành số và cập nhật trạng thái
            const value = Number(event.target.value.replace(/\D/g, ""));
            handlePriceChange(value);
          }}
          style={{ marginTop: "10px" }}
        />
        <TextField
          label="Mô tả"
          value={editedPlan.description}
          placeholder="Trống"
          onChange={handleDescriptionChange}
          multiline
          rows={3}
          style={{ marginTop: "10px" }}
        />
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveClick}
          disabled={!isPlanModified}
        >
          Lưu
        </Button>
      </CardActions>
    </Card>
  );
};

const PlanContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 4px;
  border: 1px solid #000000;
  padding: 12px;
`;

export default PlanItem;
