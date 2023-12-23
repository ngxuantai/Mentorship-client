import {useEffect} from 'react';
import usePaymentStore from '../store/paymentStore';
import {PaymentStatus} from '../constants';

const RedirectComponent = () => {
  const {payment, createPayment} = usePaymentStore();

  // Thêm hàm xử lý kết quả thanh toán
  const handlePaymentResult = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const vnpResponseCode = queryParams.get('vnp_ResponseCode');

    if (vnpResponseCode === '00') {
      // Thanh toán thành công, xử lý logic của bạn ở đây
      console.log('Thanh toán thành công');
      await createPayment({
        menteeId: '658551f06a7e6920f9112a4a',
        mentorId: '65840127a47c189dd995cdf3',
        menteeApplicationId: '6586b6070d0111d78c392fcb',
        price: 100000,
        status: PaymentStatus.SUCCESS,
      });
    } else {
      // Thanh toán không thành công, xử lý logic của bạn ở đây
      console.log('Thanh toán không thành công');
    }
  };

  // Gọi hàm handlePaymentResult khi trang chủ được tải
  useEffect(() => {
    handlePaymentResult();
  }, []);

  useEffect(() => {
    // Kiểm tra xem URL có chứa "/ReturnUrl" không
    if (window.location.pathname.includes('/ReturnUrl')) {
      // Chuyển hướng đến http://localhost:5173
      window.location.href = 'http://localhost:5173';
    }
  }, []);

  // Component không cần render gì cả
  return null;
};

export default RedirectComponent;
