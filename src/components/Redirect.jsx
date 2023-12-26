import {useEffect, useState} from 'react';
import {PaymentStatus} from '../constants';
import usePaymentStore from '../store/paymentStore';
import menteeApplicationApi from '../api/menteeApplication';
import paymentApi from '../api/payment';

const RedirectComponent = () => {
  const {payment, createPayment} = usePaymentStore();
  const [menteeAppli, setMenteeAppli] = useState();
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    const getMenteeApplication = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const vnpResponseCode = queryParams.get('vnp_ResponseCode');

      if (vnpResponseCode === '00') {
        const vnpTxnRef = queryParams.get('vnp_TxnRef');
        const menteeApplication =
          await menteeApplicationApi.getMenteeApplicationById(vnpTxnRef);

        if (menteeApplication) {
          // Kiểm tra xem đã thực hiện thanh toán cho menteeApplication này chưa
          if (!checkout) {
            setCheckout(true); // Đánh dấu rằng đã thực hiện thanh toán

            // Thực hiện thanh toán
            const res = await createPayment({
              menteeApplicationId: menteeApplication.id,
              mentorId: menteeApplication.mentorId,
              menteeId: menteeApplication.menteeProfile.id,
              price: menteeApplication.fee,
              status: PaymentStatus.SUCCESS,
            });
            await paymentApi.deletePayment(menteeApplication.id);
            window.location.href = 'http://localhost:5173/mentee/payment';
          }
        }
      } else {
        console.log('Thanh toán không thành công');
      }
    };

    // Run the effect only once by passing an empty dependency array
    if (!checkout) {
      getMenteeApplication();
    }
  }, []);

  return null;
};

export default RedirectComponent;
