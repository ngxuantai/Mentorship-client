import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import planApi from '../../../../api/plan';
import {Button, Label, TextInput, Textarea} from 'flowbite-react';
import {PlanType} from '../../../../constants';
import PlanItem from './PlanItem';

const Plan = () => {
  const [plans, setPlans] = useState([]);
  const [planLite, setPlanLite] = useState({});
  const [planStandard, setPlanStandard] = useState({});
  const [planPro, setPlanPro] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await planApi.getPlanByMentorId('65840127a47c189dd995cdf3');
      console.log(res);
      setPlans(res);
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    if (plans.length > 0) {
      const planLite = plans.find((plan) => plan.name === PlanType.LITE);
      const planStandard = plans.find(
        (plan) => plan.name === PlanType.STANDARD
      );
      const planPro = plans.find((plan) => plan.name === PlanType.PRO);
      setPlanLite(planLite);
      setPlanStandard(planStandard);
      setPlanPro(planPro);
      setShow(true);
    }
  }, [plans]);

  const handleUpdatePlan = async (updatedPlan) => {
    const checkPlan = plans.find((plan) => plan.id === updatedPlan.id);
    if (checkPlan) {
      try {
        const res = await planApi.updatePlan(updatedPlan.id, updatedPlan);
        console.log(res);
      } catch (error) {}
    } else {
      const res = await planApi.createPlan(updatedPlan);
      console.log(res);
    }
  };

  return (
    <Container>
      <Tittle>
        <h3>Kế hoạch dạy</h3>
      </Tittle>
      <ContentContainer>
        {plans.length === 0 ? (
          <p>Chưa có kế hoạch dạy</p>
        ) : (
          <>
            {show ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                }}
              >
                <PlanItem
                  plan={
                    planLite || {
                      name: PlanType.LITE,
                      callTimes: 0,
                      price: 0,
                      description: '',
                    }
                  }
                  onUpdatePlan={handleUpdatePlan}
                />
                <PlanItem
                  plan={
                    planStandard || {
                      name: PlanType.STANDARD,
                      callTimes: 0,
                      price: 0,
                      description: '',
                    }
                  }
                  onUpdatePlan={handleUpdatePlan}
                />
                <PlanItem
                  plan={
                    planPro || {
                      name: PlanType.PRO,
                      callTimes: 0,
                      price: 0,
                      description: '',
                    }
                  }
                  onUpdatePlan={handleUpdatePlan}
                />
              </div>
            ) : null}
          </>
        )}
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 900px;
  width: 90%;
`;

const Tittle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  h3 {
    width: 100%;
    font-weight: bold;
  }
`;

const ContentContainer = styled.div`
  border-radius: 0.5rem;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
`;

const PlanContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 4px;
  border: 1px solid #000000;
  padding: 12px;
`;

export default Plan;
