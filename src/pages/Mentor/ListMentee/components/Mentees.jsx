import React, {useState} from 'react';
import {Table, Checkbox, Label, TextInput, Button} from 'flowbite-react';
import ViewDetailMentee from './ViewDetailMentee';
import AddExam from './AddExam';
// import RejectedApplication from './RejectedApplication';
import {format} from 'date-fns';
import {FaCopy} from 'react-icons/fa';
import {handleCopyClick, shortenId} from '../../../../utils/dataHelper';
import {ApprovalStatus} from '../../../../constants';
import {useNavigate} from 'react-router-dom';
import {useUserStore} from '../../../../store/userStore';

export default function Mentees({applications}) {
  const [checkedItems, setCheckedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [changedDaysCompensation, setChangedDaysCompensation] = useState({});
  const {user} = useUserStore();
  const navigate = useNavigate();

  const handleDaysCompensationChange = (e, index) => {
    const {name, value} = e.target;
    setChangedDaysCompensation({
      ...changedDaysCompensation,
      [name]: value,
    });
  };

  const handleSaveClick = (index) => {
    // Thực hiện lưu dữ liệu của hàng có index vào cơ sở dữ liệu hoặc thực hiện bất kỳ hành động nào bạn cần
    // Sau khi lưu, bạn có thể đặt lại trạng thái changedDaysCompensation
    setChangedDaysCompensation({
      ...changedDaysCompensation,
      [`days-compensation-${index}`]: undefined,
    });
  };

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };
  console.log('checkbox', checkedItems);

  const handleSelectAll = () => {
    const newCheckedItems = {};
    applications.forEach((_, index) => {
      newCheckedItems[`checkbox-${index}`] = !selectAll;
    });
    setCheckedItems(newCheckedItems);
    setSelectAll(!selectAll);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case ApprovalStatus.PENDING:
        return 'bg-yellow-500'; // Hoặc màu khác tùy thuộc vào yêu cầu của bạn
      case ApprovalStatus.APPROVED:
        return 'bg-green-400';
      case ApprovalStatus.REJECTED:
        return 'bg-red-500';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case ApprovalStatus.PENDING:
        return 'Đang chờ duyệt';
      case ApprovalStatus.APPROVED:
        return 'Đã duyệt';
      case ApprovalStatus.REJECTED:
        return 'Bị từ chối';
      default:
        return '';
    }
  };

  const handleMessageClick = (id) => {
    const combinedId = user.id > id ? user.id + id : id + user.id;
    navigate(`/message/${combinedId}`);
  };

  return (
    <>
      {applications.length > 0 ? (
        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <Table.Head className="bg-gray-100 dark:bg-gray-700">
            <Table.HeadCell>
              <Label htmlFor="select-all" className="sr-only">
                Select all
              </Label>
              <Checkbox
                id="select-all"
                name="select-all"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </Table.HeadCell>
            <Table.HeadCell>Id</Table.HeadCell>
            <Table.HeadCell>Tên</Table.HeadCell>
            <Table.HeadCell>Ngày bắt đầu học</Table.HeadCell>
            <Table.HeadCell>Số ngày bù</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
            {applications.map((application, index) => (
              <Table.Row
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Table.Cell className="w-4 p-4">
                  <div className="flex items-center">
                    <Checkbox
                      checked={checkedItems[`checkbox-${index}`] || false} // Sử dụng trạng thái từ state
                      onChange={handleChange} // Thêm hàm xử lý sự kiện thay đổi
                      aria-describedby={`checkbox-${index}`}
                      id={`checkbox-${index}`}
                      name={`checkbox-${index}`} // Thêm thuộc tính name để xác định checkbox cụ thể nào đang được thay đổi
                    />
                    <label htmlFor={`checkbox-${index}`} className="sr-only">
                      checkbox
                    </label>
                  </div>
                </Table.Cell>
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
                    src={application.menteeProfile.avatar}
                    alt={`${application.name} avatar`}
                  />
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      {application.menteeProfile.firstName +
                        ' ' +
                        application.menteeProfile.lastName}
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                  {format(new Date(application.applicationDate), 'dd-MM-yyyy')}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                  <TextInput
                    type="number"
                    autoComplete="false"
                    style={{width: '50px'}}
                    id={`days-compensation-${index}`} // Thêm id để xác định ô nhập cụ thể
                    name={`days-compensation-${index}`} // Thêm name để xác định ô nhập cụ thể
                    value={
                      changedDaysCompensation[`days-compensation-${index}`] ||
                      '0'
                    } // Giá trị từ state hoặc trạng thái khác tùy vào yêu cầu của bạn
                    onChange={(e) => handleDaysCompensationChange(e, index)} // Thêm hàm xử lý sự kiện thay đổi
                  />
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-x-3 whitespace-nowrap">
                    <Button
                      onClick={() => handleSaveClick(index)}
                      disabled={
                        !changedDaysCompensation[`days-compensation-${index}`]
                      }
                    >
                      Lưu
                    </Button>
                    {/* <ViewDetailMentee application={application} /> */}
                    {/* <AddExam application={application} /> */}
                    <Button
                      onClick={() =>
                        handleMessageClick(application.menteeProfile.id)
                      }
                    >
                      Nhắn tin
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <div style={{width: '90%'}}>
          <Table className="w-full divide-y divide-gray-200 dark:divide-gray-600">
            <Table.Head className="bg-gray-100 dark:bg-gray-700">
              <Table.HeadCell>
                <Label htmlFor="select-all" className="sr-only">
                  Select all
                </Label>
                <Checkbox disabled />
              </Table.HeadCell>
              <Table.HeadCell>Id</Table.HeadCell>
              <Table.HeadCell>Tên</Table.HeadCell>
              <Table.HeadCell>Ngày bắt đầu học</Table.HeadCell>
              <Table.HeadCell>Số ngày bù</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              <Table.Row>
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                  <Label>Không có học viên</Label>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      )}
    </>
  );
}
