import { Article } from "@mui/icons-material";
import { format } from "date-fns";
import { Checkbox, Label, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaCopy } from "react-icons/fa";
import { useNavigate } from "react-router";
import menteeApplicationApi from "../../../api/menteeAplication";
import mentorApi from "../../../api/mentor";
import { useUserStore } from "../../../store/userStore";
import {
  handleCopyClick,
  mapStatus,
  shortenId,
} from "../../../utils/dataHelper";

function Applications() {
  const [applicationList, setApplicationList] = useState([]);
  const navigate = useNavigate();
  const { user } = useUserStore();
  const handleNavigateToSearchScreen = () => {
    navigate("/mentor/search");
  };
  useEffect(() => {
    if (user) {
      const fetchApplicationsAndMentors = async () => {
        const applications =
          await menteeApplicationApi.getMenteeApplicationByMenteeId(user.id);
        const mentors = await mentorApi.getAllMentors();
        if (mentors) {
          const applicationsWithMentor = applications.map((a) => {
            const findMentor = mentors.find((m) => m.id === a.mentorId);
            if (findMentor) {
              return {
                ...a,
                mentor: findMentor,
              };
            }
            return a;
          });
          setApplicationList(applicationsWithMentor);
        }
      };
      fetchApplicationsAndMentors();
    }
  }, [user]);
  return (
    <div style={{ height: 500 }}>
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
      <div className="px-3 py-3">
        <h3>Applications</h3>
      </div>
      {applicationList.length > 0 ? (
        <AllApplications applications={applicationList} />
      ) : (
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
      )}
      {/* <AllApplications applications={applicationList} /> */}
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

  return (
    <div style={{ minHeight: 500 }}>
      <Table className="min-w-full divide-y divide-gray-600 divide-gray-600">
        <Table.Head className="bg-gray-100 bg-gray-700">
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
          <Table.HeadCell>Học phí</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y divide-gray-200 bg-white divide-gray-700 bg-gray-800">
          {applications.map((application, index) => (
            <Table.Row
              key={index}
              className="hover:bg-gray-100 hover:bg-gray-700"
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
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 text-white">
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
                  src={application.mentor.avatar}
                  alt={`${application.id} avatar`}
                />
                <div className="text-sm font-normal text-gray-500 text-gray-400">
                  <div className="text-base font-semibold text-gray-900 text-white">
                    {application.mentor.firstName} {application.mentor.lastName}
                  </div>
                  <div className="text-sm font-normal text-gray-500 text-gray-400">
                    {application.mentor.email}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 text-white">
                {format(new Date(application.applicationDate), "dd-MM-yyyy")}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 text-white">
                <div
                  style={{ fontWeight: "bold" }}
                  className="flex items-center"
                >
                  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>{" "}
                  {mapStatus(application.status)}
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 text-white">
                {application.fee} VNĐ
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 text-white">
                {/* <ViewApplicationDetailModal application={application} /> */}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
export default Applications;

const ViewApplicationDetailModal = function ({ application }) {
  console.log("ViewApplicationDetailModal", application);
  const profileInfor = application.mentor;
  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">Xem</div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Thông tin</strong>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              color: "black",
            }}
          >
            <img
              style={{ marginBottom: 20 }}
              src="https://picsum.photos/300/200"
              width={200}
              height={160}
            ></img>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">Họ và tên</Label>
                <div className="mt-1">
                  <p style={styles.text}>
                    {profileInfor.firstName} {profileInfor.lastName}
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="lastName">Nghề nghiệp</Label>
                <div className="mt-1">
                  <p style={styles.text}>{profileInfor.jobTitle}</p>
                </div>
              </div>
              <div>
                <Label htmlFor="email">Số điện thoại</Label>
                <div className="mt-1">
                  <p style={styles.text}>{profileInfor.phoneNumber}</p>
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1">
                  <p style={styles.text}>{profileInfor.email}</p>
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Nghề nghiệp</Label>
                <div className="mt-1">
                  <p style={styles.text}>Mobile Developer</p>
                </div>
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <div className="mt-1">{profileInfor.company}</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <Label htmlFor="department">Lý lịch</Label>
            <div className="mt-1">
              <p style={styles.text}>{profileInfor.bio}</p>
            </div>
            <Label style={{ marginTop: 12 }} htmlFor="department">
              Chứng chỉ
            </Label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <p>Hi</p>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
const styles = {
  text: {
    color: "black",
  },
};
