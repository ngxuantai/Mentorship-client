import {Button, Checkbox, Label, Modal, Table, TextInput} from 'flowbite-react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Datepicker from 'tailwind-datepicker-react';
import Select from 'react-select';
import {useState, useEffect} from 'react';
import {
  HiChevronLeft,
  HiChevronRight,
  HiDocumentDownload,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlineEye,
  HiTrash,
  HiX,
} from 'react-icons/hi';
// import {useApplicationStore} from '../../store/application';
// import {useUserStore} from '../../store/user';
import ListPayment from './components/ListPayment';
import HistoryPayment from './components/HistoryPayment';
import {useMenteeAppliStore} from '../../../store/menteeAppli';
import {applicationToExcelData} from '../../../utils/excelDataHelper';
import {exportExcel} from '../../../utils/excelHelper';
import {PaymentStatus} from '../../../constants';

const dropdownOption = [
  {value: 'id', label: 'Id'},
  {value: 'displayName', label: 'Tên học viên'},
];

const ListMentee = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [applicationList, setApplicationList] = useState([]);

  const [selectedOption, setSelectedOption] = useState(dropdownOption[1]);

  const [show, setShow] = useState(false);

  const {menteeApplications, menteeAppliApproved, getMenteeAppliByMentorId} =
    useMenteeAppliStore();
  //   const {applications, setApplications, fetchApplications} =
  //     useApplicationStore();
  //   const {user, getUserById} = useUserStore();

  const handleClose = (state) => {
    setShow(state);
  };

  useEffect(() => {
    const fetchAndSetApplications = async () => {
      try {
        await getMenteeAppliByMentorId('65840127a47c189dd995cdf3');
      } catch (er) {
        console.error(er);
      }
    };

    fetchAndSetApplications();
  }, []);

  useEffect(() => {}, [menteeAppliApproved]);

  //   useEffect(() => {
  //     // const applicationsWithUser = applications.map((application) => {
  //     //   // const user = await getUserById(application.mentorId);
  //     //   return {...user, ...application};
  //     // });
  //     const delayDebounceFn = setTimeout(() => {
  //       if (searchTerm) {
  //         const results = menteeAppliApproved.filter((application) =>
  //           application[selectedOption.value]
  //             .toLowerCase()
  //             .includes(searchTerm.toLowerCase())
  //         );
  //         console.log('applicationList', results, applicationList, searchTerm);
  //         setMenteeList(results);
  //       } else {
  //         setMenteeList(menteeAppliApproved);
  //       }
  //     }, 1200);
  //     return () => clearTimeout(delayDebounceFn);
  //   }, [searchTerm, menteeAppliApproved]);

  const options = {
    title: 'Select date',
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: 'Clear',
    maxDate: new Date('2030-01-01'),
    minDate: new Date('1950-01-01'),
    icons: {
      // () => ReactElement | JSX.Element
    },
    datepickerClassNames: 'top-12',
    defaultDate: new Date(),
    language: 'en',
    disabledDates: [],
    weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    inputNameProp: 'date',
    inputIdProp: 'date',
    inputPlaceholderProp: 'Select Date',
    inputDateFormatProp: {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  };

  const handleExportFileExcel = () => {
    const jsonData = menteeList.map((a) => applicationToExcelData(a));
    console.log('jsonData', jsonData);
    exportExcel(jsonData, 'application_list');
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <Tabs value={value} onChange={handleChange}>
                <Tab
                  label="Thanh toán"
                  value={0}
                  style={{fontWeight: 'bold'}}
                />
                <Tab
                  label="Lịch sử thanh toán"
                  value={1}
                  style={{fontWeight: 'bold'}}
                />
              </Tabs>
              {value === 0 && (
                <ListPayment applications={menteeAppliApproved} />
              )}
              {value === 1 && <HistoryPayment />}
              {/* {value === 2 && <Profiles />} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListMentee;
