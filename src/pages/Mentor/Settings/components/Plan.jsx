import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import paymentApi from "../../../../api/payment";
import planApi from "../../../../api/plan";
import { PlanType } from "../../../../constants";
import PlanItem from "./PlanItem";

const Plan = () => {
  const [plans, setPlans] = useState([]);
  const [planLite, setPlanLite] = useState({});
  const [planStandard, setPlanStandard] = useState({});
  const [planPro, setPlanPro] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await planApi.getPlanByMentorId("65840127a47c189dd995cdf3");
      console.log(res);
      setPlans(res);
    };
    // get request payment
    const fetchPayment = async () => {
      const res = await paymentApi.getRequestUrl({
        menteeId: "658551f06a7e6920f9112a4a",
        menteeApplicattion: "6586b6070d0111d78c392fc8",
        amount: 100000,
        description: "thanh toan",
      });
      console.log(res);
      setUrl(res);
    };

    fetchPlans();
    fetchPayment();
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

  const [url, setUrl] = useState("");
  const handleCheckOut = () => {
    //redirect to url
    window.location.href = url;
  };

  return (
    <Container>
      {/* <TipsContainer>
        <p
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <PrivacyTipIcon style={{ color: "#3f83f8", fontSize: "16px" }} /> Lưu
          ý
        </p>
        <p style={{ fontWeight: "500", marginLeft: 24 }}>
          Số lần gọi phải chia hết cho số tuần học
        </p>
      </TipsContainer> */}

      <ContentContainer>
        {plans.length === 0 ? (
          <p>Chưa có kế hoạch dạy</p>
        ) : (
          <>
            {show ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "8px",
                }}
              >
                <PlanItem
                  plan={
                    planLite || {
                      name: PlanType.LITE,
                      callTimes: 0,
                      price: 0,
                      description: "",
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
                      description: "",
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
                      description: "",
                    }
                  }
                  onUpdatePlan={handleUpdatePlan}
                />
              </div>
            ) : null}
          </>
        )}
      </ContentContainer>
      <Button onClick={() => handleCheckOut()}>Thanh toan</Button>
    </Container>
  );
};

const Container = styled.div`
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
