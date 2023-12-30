import {
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
} from "flowbite-react";
import Datepicker from "tailwind-datepicker-react";
import Select from "react-select";
import { useState, useEffect } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiDocumentDownload,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlineEye,
  HiTrash,
  HiX,
} from "react-icons/hi";
// import {useApplicationStore} from '../../store/application';
// import {useUserStore} from '../../store/user';
import ListPayment from "./components/ListPayment";
import { useMenteeAppliStore } from "../../../store/menteeAppli";
import { applicationToExcelData } from "../../../utils/excelDataHelper";
import { exportExcel } from "../../../utils/excelHelper";
import { PaymentStatus } from "../../../constants";

const dropdownOption = [
  { value: "id", label: "Id" },
  { value: "displayName", label: "Tên học viên" },
];

const ListMentee = () => {
  const [show, setShow] = useState(false);
  const [warningVisible, setWarningVisible] = useState(true); // Add this line

  const { menteeApplications, menteeAppliApproved, getMenteeAppliByMentorId } =
    useMenteeAppliStore();

  useEffect(() => {
    const fetchAndSetApplications = async () => {
      try {
        await getMenteeAppliByMentorId("65840127a47c189dd995cdf3");
      } catch (er) {
        console.error(er);
      }
    };

    fetchAndSetApplications();
  }, []);

  useEffect(() => {}, [menteeAppliApproved]);

  const handleWarningToggle = () => {
    // Add this function
    setWarningVisible(!warningVisible);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="flex flex-col overflow-x-auto">
        {warningVisible && ( // Add this condition
          <Alert severity="warning">
            <AlertTitle>Nhắc nhở</AlertTitle>
            Bạn cần phải thanh toán trong vòng
            <strong>{` ${Max_Pay_Day} ngày `}</strong>
            nếu không đơn đăng ký sẽ bị huỷ
          </Alert>
        )}
        {/* Add this button */}
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow">
            <Tabs value={value} onChange={handleChange}>
              <Tab
                label="Thanh toán"
                value={0}
                style={{ fontWeight: "bold" }}
              />
              <Tab
                label="Lịch sử thanh toán"
                value={1}
                style={{ fontWeight: "bold" }}
              />
            </Tabs>
            {value === 0 && <ListPayment applications={menteeAppliApproved} />}
            {value === 1 && <HistoryPayment />}
            {/* {value === 2 && <Profiles />} */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListMentee;
