import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import {FloatingLabel} from 'flowbite-react';
import {useEffect, useState} from 'react';
import {PlanType} from '../../../../constants/index';
import currencyFormatter from '../../../../utils/moneyConverter';
const PlanItem = ({plan, onUpdatePlan}) => {
  const [editedPlan, setEditedPlan] = useState(plan);
  const [isPlanModified, setIsPlanModified] = useState(false);
  useEffect(() => {
    const isModified =
      plan.callTimes !== editedPlan.callTimes ||
      plan.price !== editedPlan.price ||
      plan.weeks !== editedPlan.weeks ||
      plan.isActive !== editedPlan.isActive ||
      plan.description !== editedPlan.description;

    setIsPlanModified(isModified);
  }, [plan, editedPlan]);

  const getPlanName = (plan) => {
    switch (plan.name) {
      case PlanType.LITE:
        return 'Lite';
      case PlanType.STANDARD:
        return 'Standard';
      case PlanType.PRO:
        return 'Pro';
      default:
        return '';
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
    const {name, value} = event.tartget;
    setEditedPlan({
      ...editedPlan,
      [name]: value,
    });
  };
  const handleTogglePlan = (plan) => {
    setEditedPlan(plan);
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
        marginBottom: '20px',
        boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" style={{fontWeight: 'bold'}}>
          {getPlanName(plan)}
        </Typography>
        <FloatingLabel
          label="Số lần gọi mỗi tuần"
          variant="outlined"
          value={editedPlan.callTimes}
          onChange={handleCallTimesChange}
          style={{width: '100%', fontSize: '1rem'}}
        />
        <FloatingLabel
          label="Số tuần học"
          variant="outlined"
          name="weeks"
          value={editedPlan.weeks}
          onChange={onInputChange}
          style={{width: '100%', fontSize: '1rem'}}
        />
        <FloatingLabel
          label="Học phí"
          variant="outlined"
          value={currencyFormatter(editedPlan.price)}
          onChange={(event) => {
            // Chuyển đổi giá trị nhập vào thành số và cập nhật trạng thái
            const value = Number(event.target.value.replace(/\D/g, ''));
            handlePriceChange(value);
          }}
          style={{width: '100%', fontSize: '1rem'}}
        />
        <FloatingLabel
          label="Mô tả"
          variant="outlined"
          value={editedPlan.description}
          onChange={handleDescriptionChange}
          style={{width: '100%', fontSize: '1rem'}}
        />
      </CardContent>
      <div className="flex justify-between px-3">
        <PlanSwitch plan={plan} onTogglePlan={handleTogglePlan}></PlanSwitch>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveClick}
            disabled={!isPlanModified}
          >
            Lưu
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

const PlanSwitch = ({plan, onTogglePlan}) => {
  const [isActive, setIsActive] = useState(plan.isActive);

  const handleToggle = (event) => {
    setIsActive(event.target.checked);
    onTogglePlan({...plan, isActive: event.target.checked});
  };

  return (
    <FormControlLabel
      control={
        <Switch checked={isActive} onChange={handleToggle} name="isActive" />
      }
      label={isActive ? 'Gói học đang hoạt động' : 'Gói học không hoạt động'}
    />
  );
};

export default PlanItem;
