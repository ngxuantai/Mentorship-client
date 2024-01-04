import { format } from "date-fns";
import { Checkbox, Label, Table } from "flowbite-react";
import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { ApprovalStatus } from "../../../../constants";
import { handleCopyClick, shortenId } from "../../../../utils/dataHelper";
import RejectedApplication from "./RejectedApplication";
import ViewDetailApplication from "./ViewDetailApplication";

export default function ListApplications({
  checkedItems,
  resetSelectedItems,
  applications,
  onSelectedItems,
}) {
  // const [checkedItems, setCheckedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const handleChange = (event) => {
    onSelectedItems(event);
  };
  console.log("checkbox", checkedItems);

  const handleSelectAll = () => {
    // const newCheckedItems = {};
    // applications.forEach((_, index) => {
    //   newCheckedItems[`checkbox-${index}`] = !selectAll;
    // });
    // setSelectAll(!selectAll);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case ApprovalStatus.PENDING:
        return "bg-yellow-500"; // Hoặc màu khác tùy thuộc vào yêu cầu của bạn
      case ApprovalStatus.APPROVED:
        return "bg-green-400";
      case ApprovalStatus.REJECTED:
        return "bg-red-500";
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case ApprovalStatus.PENDING:
        return "Đang chờ duyệt";
      case ApprovalStatus.APPROVED:
        return "Đã duyệt";
      case ApprovalStatus.REJECTED:
        return "Bị từ chối";
      default:
        return "";
    }
  };

  return (
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
        <Table.HeadCell>Ngày gửi</Table.HeadCell>
        <Table.HeadCell>Trạng thái</Table.HeadCell>
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
                  checked={checkedItems[`${application.id}`] || false} // Sử dụng trạng thái từ state
                  onChange={handleChange} // Thêm hàm xử lý sự kiện thay đổi
                  aria-describedby={`checkbox-${index}`}
                  id={`checkbox-${index}`}
                  name={`${application.id}`} // Thêm thuộc tính name để xác định checkbox cụ thể nào đang được thay đổi
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
                alt={`${application.menteeProfile.firstName} avatar`}
              />
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {application.menteeProfile.firstName +
                    " " +
                    application.menteeProfile.lastName}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {format(new Date(application.applicationDate), "dd-MM-yyyy")}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
              <div className="flex items-center">
                <div
                  className={`mr-2 h-2.5 w-2.5 rounded-full ${getStatusColor(
                    application.status
                  )}`}
                ></div>
                {getStatusText(application.status)}
              </div>
            </Table.Cell>

            <Table.Cell>
              <div className="flex items-center gap-x-3 whitespace-nowrap">
                <ViewDetailApplication
                  resetSelectedItems={resetSelectedItems}
                  application={application}
                />
                <RejectedApplication application={application} />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
