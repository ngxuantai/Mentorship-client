import React, {useState, useEffect} from 'react';
import {Table, Checkbox, Label, TextInput, Button} from 'flowbite-react';
import {format} from 'date-fns';
import {FaCopy} from 'react-icons/fa';
import {handleCopyClick, shortenId} from '../../../../utils/dataHelper';
import mentorApi from '../../../../api/mentor';
import paymentApi from '../../../../api/payment';
import {PaymentStatus} from '../../../../constants';
import usePaymentStore from '../../../../store/paymentStore';

export default function ListPayment({applications}) {
  const [mentorInfo, setMentorInfo] = useState([]);
  const [url, setUrl] = useState('');
  const {setPayment} = usePaymentStore();

  const getStatusColor = (status) => {
    switch (status) {
      case PaymentStatus.SUCCESS:
        return 'bg-green-400';
      case PaymentStatus.FAILED:
        return 'bg-red-500';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case PaymentStatus.SUCCESS:
        return 'Đã thanh toán';
      case PaymentStatus.FAILED:
        return 'Chưa thanh toán';
      default:
        return '';
    }
  };

  const getMentorInfor = async (mentorId) => {
    const res = await mentorApi.getMentorById(mentorId);
    console.log(res);
    return res;
  };

  useEffect(() => {
    const fetchMentorInfo = async (mentorId, index) => {
      const mentorInfo = await getMentorInfor(mentorId);
      setMentorInfo((prevState) => ({
        ...prevState,
        [index]: mentorInfo,
      }));
    };

    applications.forEach((application, index) => {
      fetchMentorInfo(application.mentorId, index);
    });
  }, [applications]);

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
        <Table.HeadCell>Khóa học</Table.HeadCell>
        <Table.HeadCell>Giáo viên</Table.HeadCell>
        <Table.HeadCell>Ngày bắt đầu học</Table.HeadCell>
        <Table.HeadCell>Trạng thái</Table.HeadCell>
        <Table.HeadCell></Table.HeadCell>
      </Table.Head>

      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {applications.map((application, index) => (
          <Table.Row
            key={index}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              <div className="flex items-center">
                {shortenId(application.id)}
                <button
                  onClick={() => handleCopyClick(application.id)}
                  className="ml-2"
                >
                  <FaCopy className="text-xl" />
                </button>
              </div>
            </Table.Cell>
            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
              <img
                className="h-10 w-10 rounded-full"
                src={mentorInfo[index]?.avatar || ''}
                alt={`${mentorInfo[index]?.firstName} ${mentorInfo[index]?.lastName} avatar`}
              />
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {mentorInfo[index]?.firstName} {mentorInfo[index]?.lastName}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {format(new Date(application.applicationDate), 'dd-MM-yyyy')}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
              <div className="flex items-center">
                <div
                  className={`mr-2 h-2.5 w-2.5 rounded-full ${getStatusColor(
                    application.paymentStatus
                  )}`}
                ></div>
                {getStatusText(application.paymentStatus)}
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-x-3 whitespace-nowrap">
                <Button
                  disabled={application.paymentStatus === PaymentStatus.SUCCESS}
                  onClick={() => handleCheckOut(application)}
                >
                  Thanh toán
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
