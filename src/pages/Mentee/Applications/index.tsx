import { Article } from "@mui/icons-material";
import { format } from "date-fns";
import { Checkbox, Label, Table } from "flowbite-react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaCopy } from "react-icons/fa";
import { useNavigate } from "react-router";
import MenteeHeader from "../../../components/MenteeHeader";
import { handleCopyClick, shortenId } from "../../../utils/dataHelper";

function Applications() {
  const [applicationList, setApplicationList] = useState([]);
  const navigate = useNavigate();
  const handleNavigateToSearchScreen = () => {
    navigate("/mentor/search");
  };
  return (
    <div style={{}}>
      {/* <MenteeHeader></MenteeHeader> */}
      <div
        className="w-full py-2 text-center"
        style={{ backgroundColor: "#04b4ba" }}
      >
        <h5 style={{ color: "white" }}>
          Want to double the chance of success for your applications?{" "}
          <a href="/settings" style={{ color: "white" }}>
            Complete your profile
          </a>{" "}
        </h5>
      </div>
      <div className="px-5 py-5">
        <h3>Applications</h3>
        <div className="p-2 border rounded d-flex flex-column justify-content-center align-items-center text-center">
          <Article style={{ fontSize: "50px" }} />
          <p style={{ fontWeight: "500" }}>No active applications</p>
          <p className="text-body-tertiary">
            Once you have applied to a mentor, they will show up here
          </p>
          <Button
            onClick={handleNavigateToSearchScreen}
            style={{ fontWeight: "500" }}
            variant="primary"
          >
            Find mentors
          </Button>
        </div>
      </div>
      {/* {applicationList.length > 0 && (
        <AllApplications applications={applicationList} />
      )} */}
      <AllApplications applications={applicationList} />
    </div>
  );
}

const AllApplications = ({ applications }) => {
  const [checkedItems, setCheckedItems] = useState({});
  console.log("Allapplication", applications);
  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };
  console.log("checkbox", checkedItems);

  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell>
        <Table.HeadCell>Id</Table.HeadCell>
        <Table.HeadCell>Tên mentor</Table.HeadCell>
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
                src={application.mentorProfile.avatar}
                alt={`${application.id} avatar`}
              />
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {application.mentorProfile.firstName}{" "}
                  {application.mentorProfile.lastName}
                </div>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {application.mentorProfile.email}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {format(new Date(application.applicationDate), "dd-MM-yyyy")}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
              <div className="flex items-center">
                <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>{" "}
                {/* {mapStatus(application.status)} */}
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-x-3 whitespace-nowrap">
                {/* <ViewApplicationDetail application={application} />
                <RejectButton application={application} /> */}
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
export default Applications;
