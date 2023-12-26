import React, {useState, useEffect} from 'react';
import {Table, Checkbox, Label, TextInput, Button} from 'flowbite-react';
import {add, format} from 'date-fns';
import {FaCopy} from 'react-icons/fa';
import {handleCopyClick, shortenId} from '../../../../utils/dataHelper';
import mentorApi from '../../../../api/mentor';
import paymentApi from '../../../../api/payment';
import {PaymentStatus} from '../../../../constants';
import usePaymentStore from '../../../../store/paymentStore';
import currencyFormatter from '../../../../utils/moneyConverter';

export default function HistoryPayment() {
  const [mentorInfo, setMentorInfo] = useState([]);
  const [url, setUrl] = useState('');
  // const {setPayment} = usePaymentStore();
  const [listPayment, setListPayment] = useState([]);
  const getStatusColor = (status) => {
    switch (status) {
      case PaymentStatus.SUCCESS:
        return 'bg-green-500';
      case PaymentStatus.FAILED:
        return 'bg-red-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case PaymentStatus.SUCCESS:
        return 'Thanh toán thành công';
      case PaymentStatus.FAILED:
        return 'Thanh toán thất bại';
    }
  };

  const isPaymentOverdue = (approvedDate) => {
    const currentDate = new Date();
    const approved = new Date(approvedDate);
    return currentDate - approved > 3 * 86400000;
  };

  const getMentorInfor = async (mentorId) => {
    const res = await mentorApi.getMentorById(mentorId);
    console.log(res);
    return res;
  };

  useEffect(() => {
    const fecthData = async () => {
      const data = await paymentApi.getPaymentsByUserId(
        '65825627600fc966c46f60f8'
      );
      console.log(data);
      setListPayment(data);
    };

    fecthData();
  }, []);

  const handleCheckOut = async (application) => {
    const res = await paymentApi.getRequestUrl({
      menteeId: application.menteeProfile.id,
      menteeApplicattion: application.id,
      amount: application.fee,
      description: 'thanh toan',
    });
    window.location.href = res;
  };

  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>STT</Table.HeadCell>
        <Table.HeadCell>Khóa học</Table.HeadCell>
        <Table.HeadCell>Học phí</Table.HeadCell>
        <Table.HeadCell>Ngày thanh toán</Table.HeadCell>
        <Table.HeadCell>Trạng thái</Table.HeadCell>
        <Table.HeadCell></Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {listPayment.map((payment, index) => (
          <Table.Row
            key={index}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {index + 1}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              <div className="flex items-center">
                {shortenId(payment.id)}
                <button
                  onClick={() => handleCopyClick(payment.id)}
                  className="ml-2"
                >
                  <FaCopy className="text-xl" />
                </button>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {currencyFormatter(payment.price)}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {format(new Date(payment.createdAt), 'dd/MM/yyyy')}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
              <div className="flex items-center">
                <div
                  className={`mr-2 h-2.5 w-2.5 rounded-full ${getStatusColor(
                    payment.status
                  )}`}
                ></div>
                {getStatusText(payment.status)}
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
