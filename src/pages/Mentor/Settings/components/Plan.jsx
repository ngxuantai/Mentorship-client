import {Button} from 'flowbite-react';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import paymentApi from '../../../../api/payment';
import planApi from '../../../../api/plan';
import {PlanType} from '../../../../constants';
import {useUserStore} from '../../../../store/userStore';
import PlanItem from './PlanItem';
import ReactLoading from 'react-loading';

const Plan = () => {
  const {user} = useUserStore();
  const [plans, setPlans] = useState([]);
  const [planLite, setPlanLite] = useState({});
  const [planStandard, setPlanStandard] = useState({});
  const [planPro, setPlanPro] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await planApi.getPlanByMentorId(user.id);
      console.log('fetchPlans', res);
      setPlans(res);
    };
    // get request payment
    // const fetchPayment = async () => {
    //   const res = await paymentApi.getRequestUrl({
    //     menteeId: '658551f06a7e6920f9112a4a',
    //     menteeApplicattion: '6586b6070d0111d78c392fc8',
    //     amount: 100000,
    //     description: 'thanh toan',
    //   });
    //   console.log(res);
    //   setUrl(res);
    // };

    fetchPlans();
    // fetchPayment();
  }, []);

  useEffect(() => {
    if (plans && plans.length > 0) {
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

  const checkIsOnePlanActive = () => {
    const liteActive = planLite.isActive;
    const standardActive = planStandard.isActive;
    const proActive = planPro.isActive;
    return liteActive || standardActive || proActive;
  };
  const handleUpdatePlan = async (updatedPlan) => {
    if (!checkIsOnePlanActive()) {
      alert('Phải có ít nhất 1 gói học hoạt động');
      return;
    }
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

  const [url, setUrl] = useState('');

  return (
    <Container>
      <ContentContainer>
        {plans?.length === 0 ? (
          // <p>Chưa có kế hoạch dạy</p>
          <div style={{margin: '0 auto'}}>
            <ReactLoading type="spin" color="blue" />
          </div>
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
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
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
const TipsContainer = styled.div`
  background-color: #e0edfe;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin: 12px 0px;
`;
const ContentContainer = styled.div`
  border-radius: 0.5rem;
  border: 1px solid gray;
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
