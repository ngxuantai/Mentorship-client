import React, {useState, useEffect} from 'react';
import {Table, Checkbox, Label, TextInput, Button} from 'flowbite-react';
import {add, format} from 'date-fns';
import {FaCopy} from 'react-icons/fa';
import {handleCopyClick, shortenId} from '../../../../utils/dataHelper';
import mentorApi from '../../../../api/mentor';
import paymentApi from '../../../../api/payment';
import {PaymentStatus} from '../../../../constants';
import {useUserStore} from '../../../../store/userStore';
import {useMenteeAppliStore} from '../../../../store/menteeAppliStore';
import usePaymentStore from '../../../../store/paymentStore';
import currencyFormatter from '../../../../utils/moneyConverter';

export default function ListPayment() {
  const [mentorInfo, setMentorInfo] = useState([]);
  const [menteeAppli, setMenteeAppli] = useState([]);
  const [url, setUrl] = useState('');

  const {user} = useUserStore();
  const {menteeApplications, menteeAppliApproved, getMenteeAppliByMenteeId} =
    useMenteeAppliStore();
  const {setPayment} = usePaymentStore();

  useEffect(() => {
    const fetchAndSetApplications = async () => {
      try {
        console.log('user', user);
        await getMenteeAppliByMenteeId(user.id);
      } catch (er) {
        console.error(er);
      }
    };

    fetchAndSetApplications();
  }, [user]);

  // const getStatusColor = (status, isPaid, approvedDate) => {
  //   const currentDate = new Date();
  //   const approved = new Date(approvedDate);
  //   if (isPaid) return 'bg-green-400';
  //   else if (currentDate - approved > 3 * 86400000) return 'bg-red-500';
  //   switch (status) {
  //     case PaymentStatus.SUCCESS:
  //       return 'bg-green-400';
  //     case PaymentStatus.FAILED:
  //       return 'bg-red-500';
  //     default:
  //       return '';
  //   }
  // };

  // const getStatusText = (status, isPaid, approvedDate) => {
  //   const currentDate = new Date();
  //   const approved = new Date(approvedDate);
  //   if (isPaid) return 'Đã thanh toán';
  //   else if (currentDate - approved > 3 * 86400000) return 'Quá hạn thanh toán';
  //   switch (status) {
  //     case PaymentStatus.SUCCESS:
  //       return 'Đã thanh toán';
  //     case PaymentStatus.FAILED:
  //       return 'Chưa thanh toán';
  //     default:
  //       return '';
  //   }
  // };

  const getStatusColor = (isPaid, approvedDate) => {
    if (isPaid) {
      return 'bg-green-400';
    }

    const overdue = isPaymentOverdue(approvedDate);
    return 'bg-red-500';
  };

  const getStatusText = (isPaid, approvedDate) => {
    if (isPaid) {
      return 'Đã thanh toán';
    }

    const overdue = isPaymentOverdue(approvedDate);
    return overdue ? 'Quá hạn thanh toán' : 'Chưa thanh toán';
  };

  const isPaymentOverdue = (approvedDate) => {
    const currentDate = new Date();
    const approved = new Date(approvedDate);
    return currentDate - approved > 10 * 86400000;
  };

  const getMentorInfor = async (mentorId) => {
    const res = await mentorApi.getMentorById(mentorId);
    // console.log(res);
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

    menteeAppliApproved.forEach((application, index) => {
      console.log(application);
      fetchMentorInfo(application.mentorId, index);
    });
    // setMenteeAppli(
    //   applications.filter((a) => Date(a.approvedDate) - Date() >= 7 * 86400000)
    // );
    // console.log(new Date() - new Date(applications[0].approvedDate));
  }, [menteeAppliApproved]);

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
        <Table.HeadCell>Học phí</Table.HeadCell>
        <Table.HeadCell>Hạn nộp</Table.HeadCell>
        <Table.HeadCell>Trạng thái</Table.HeadCell>
        <Table.HeadCell></Table.HeadCell>
      </Table.Head>

      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {menteeAppliApproved
          .filter((a) => new Date() - new Date(a.approvedDate) >= 7 * 86400000)
          .map((application, index) => (
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
                {currencyFormatter(application.fee)}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {format(
                  add(new Date(application.approvedDate), {days: 10}),
                  'dd/MM/yyyy'
                )}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                <div className="flex items-center">
                  <div
                    className={`mr-2 h-2.5 w-2.5 rounded-full ${getStatusColor(
                      application.isPaid,
                      application.approvedDate
                    )}`}
                  ></div>
                  {getStatusText(application.isPaid, application.approvedDate)}
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-x-3 whitespace-nowrap">
                  <Button
                    disabled={
                      application.isPaid === true ||
                      getStatusText(
                        application.isPaid,
                        application.approvedDate
                      ) === 'Quá hạn thanh toán'
                    }
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
