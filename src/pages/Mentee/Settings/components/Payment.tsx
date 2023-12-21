import { Article } from "@mui/icons-material";
import { format } from "date-fns";
import { Checkbox, Label, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaCopy } from "react-icons/fa";
import { useNavigate } from "react-router";
import mentorApi from "../../../../api/mentor";
import paymentApi from "../../../../api/payment";
import { useUserStore } from "../../../../store/userStore";
import {
  handleCopyClick,
  mappingPaymentStatus,
  shortenId,
} from "../../../../utils/dataHelper";

export default function Payment() {
  const [paymentList, setPaymentList] = useState([]);
  const navigate = useNavigate();
  const { user } = useUserStore();
  const handleNavigateToSearchScreen = () => {
    navigate("/mentor/search");
  };
  useEffect(() => {
    if (user) {
      const fetchPaymentsAndMentors = async () => {
        const payments = await paymentApi.getPaymentsByUserId(user.id);
        console.log("payment", payments);
        const mentorPromises = payments.map(async (p) => {
          const mentor = await mentorApi.getMentorById(p.mentorId);
          return mentor;
        });
        const mentors = await Promise.all(mentorPromises);
        const paymentsWithMentors = payments.map((p, index) => ({
          ...p,
          mentor: mentors[index],
        }));
        console.log("Payments with mentors:", paymentsWithMentors);
        setPaymentList(paymentsWithMentors);
      };
      fetchPaymentsAndMentors();
    }
  }, [user]);
  return (
    <div style={{ height: 500 }}>
      {/* <MenteeHeader></MenteeHeader> */}

      <div className="px-3 py-3">
        <h3>Lịch sử thanh toán</h3>
      </div>
      {paymentList.length > 0 ? (
        <AllPayments payments={paymentList} />
      ) : (
        <div className="p-2 border rounded d-flex flex-column justify-content-center align-items-center text-center">
          <Article style={{ fontSize: "50px" }} />
          <p style={{ fontWeight: "500" }}>Không có lịch sử thanh toán</p>
        </div>
        // <p className="text-body-tertiary">
        //   Once you have applied to a mentor, they will show up here
        // </p>
        // <Button
        //   onClick={handleNavigateToSearchScreen}
        //   style={{ fontWeight: "500" }}
        //   variant="primary"
        // >
        //   Find mentors
        // </Button>
      )}
      {/* <AllPayments payments={paymentList} /> */}
    </div>
  );
}

const AllPayments = ({ payments }) => {
  const [checkedItems, setCheckedItems] = useState({});
  console.log("Allpayment", payments);
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
          <Table.HeadCell>Ngày thanh toán</Table.HeadCell>
          <Table.HeadCell>Trạng thái</Table.HeadCell>
          <Table.HeadCell>Học phí</Table.HeadCell>
          <Table.HeadCell>Ghi chú</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y divide-gray-200 bg-white divide-gray-700 bg-gray-800">
          {payments.map((payment, index) => (
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
                  {shortenId(payment.id)}
                  <button
                    onClick={() => handleCopyClick(payment.id)}
                    className="ml-2"
                  >
                    <FaCopy className="text-xl" />
                  </button>
                </div>
              </Table.Cell>
              <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={payment.mentor.avatar}
                  alt={`${payment.id} avatar`}
                />
                <div className="text-sm font-normal text-gray-500 text-gray-400">
                  <div className="text-base font-semibold text-gray-900 text-white">
                    {payment.mentor.firstName} {payment.mentor.lastName}
                  </div>
                  <div className="text-sm font-normal text-gray-500 text-gray-400">
                    {payment.mentor.email}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 text-white">
                {format(new Date(payment.createdAt), "dd-MM-yyyy HH:mm:ss")}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900">
                <div
                  style={{
                    color: payment.status === 0 ? "tomato" : "green",
                    fontWeight: "bold",
                  }}
                  className="flex items-center"
                >
                  <div
                    className="mr-2 h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        payment.status === 0 ? "tomato" : "green",
                    }}
                  ></div>{" "}
                  {mappingPaymentStatus(payment.status)}
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 text-white">
                {payment.price} VNĐ
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 text-white">
                {/* <ViewPaymentDetailModal payment={payment} /> */}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

const ViewPaymentDetailModal = function ({ payment }) {
  console.log("ViewPaymentDetailModal", payment);
  const profileInfor = payment.mentor;
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
