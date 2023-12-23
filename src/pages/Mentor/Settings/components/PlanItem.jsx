import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Label, TextInput, Textarea, Button} from 'flowbite-react';
import {PlanType} from '../../../../constants/index';

const PlanItem = ({plan, onUpdatePlan}) => {
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

  const handlePriceChange = (event) => {
    setEditedPlan({
      ...editedPlan,
      price: event.target.value,
    });
  };

  const handleDescriptionChange = (event) => {
    setEditedPlan({
      ...editedPlan,
      description: event.target.value,
    });
  };

  const handleSaveClick = () => {
    // Call the onUpdatePlan function to update the plan in the parent component
    onUpdatePlan(editedPlan);
    setIsPlanModified(false);
  };

  return (
    <PlanContainer>
      <Label style={{fontWeight: 'bold', fontSize: '20px'}}>
        {getPlanName(plan)}
      </Label>
      <div
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
      >
        <div className="mb-2 flex">
          <Label
            htmlFor="email1"
            value="Số lần gọi: "
            style={{width: '80px'}}
          />
        </div>
        <TextInput
          value={editedPlan.callTimes}
          onChange={handleCallTimesChange}
          sizing="sm"
        />
      </div>
      <div
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
      >
        <div className="mb-2 flex">
          <Label htmlFor="price" value="Học phí: " style={{width: '80px'}} />
        </div>
        <TextInput
          value={editedPlan.price}
          onChange={handlePriceChange}
          sizing="sm"
        />
      </div>
      <div>
        <div className="mb-2 flex">
          <Label
            htmlFor="description"
            value="Mô tả: "
            style={{width: '80px'}}
          />
        </div>
        <Textarea
          value={editedPlan.description || 'Không có'}
          onChange={handleDescriptionChange}
          sizing="sm"
          rows={3}
          style={{minHeight: '100px'}}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Button onClick={handleSaveClick} disabled={!isPlanModified}>
          {' '}
          Lưu
        </Button>
      </div>
    </PlanContainer>
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
