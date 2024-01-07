import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
} from 'flowbite-react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Datepicker from 'tailwind-datepicker-react';
import {useState, useEffect} from 'react';
import {
  HiChevronLeft,
  HiChevronRight,
  HiDocumentDownload,
} from 'react-icons/hi';
import TeachingCalendar from '../../../components/Calendar';
import firebaseInstance from '../../../services/firebase';
import {useMenteeAppliStore} from '../../../store/menteeAppliStore';
import {useUserStore} from '../../../store/userStore';
import {checkIfEventOverlap} from '../../../utils/dataHelper';
import {applicationToExcelData} from '../../../utils/excelDataHelper';
import {exportExcel} from '../../../utils/excelHelper';
import ListApplications from './components/ListApplications';
import HistoryApplication from './components/HistoryApplication';
import {ApprovalStatus} from '../../../constants';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

const dropdownOption = [
  {value: 'id', label: 'Id'},
  {value: 'displayName', label: 'Tên học viên'},
];

const ApplicationListPage = () => {
  const {user} = useUserStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [applicationList, setApplicationList] = useState([]);
  const [applicationProvedList, setApplicationProvedList] = useState([]);
  const [events, setEvents] = useState([]);
  const [mentorEvents, setMentorEvents] = useState([]);
  const [selectedApplications, setSelectedApplication] = useState({});
  const [selectedOption, setSelectedOption] = useState('nameMentee');
  console.log('mentorEvents', mentorEvents);

  const [show, setShow] = useState(false);
  const [value, setValue] = useState(0);

  const {menteeApplications, menteeAppliApproved, getMenteeAppliByMentorId} =
    useMenteeAppliStore();

  const handleClose = (state) => {
    setShow(state);
  };

  const onEventChange = (weekList) => {
    if (!weekList) return;
    const filteredEvents = weekList
      .map((week) => {
        return week.map((e) => {
          return {
            ...e,
            start: new Date(e.start),
            color: 'gray',
            end: new Date(e.end),
          };
        });
      })
      .flat();
    setMentorEvents(filteredEvents);
  };
  useEffect(() => {
    if (user) {
      const unsubscribe = firebaseInstance.observeCalendarChanges(
        user.id,
        onEventChange
      );
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    const fetchAndSetApplications = async () => {
      try {
        await getMenteeAppliByMentorId(user.id);
      } catch (er) {
        console.error(er);
      }
    };

    fetchAndSetApplications();
    const appliNoApproved = menteeApplications.filter(
      (a) => a.status === ApprovalStatus.PENDING
    );
    setApplicationList(appliNoApproved);
    setApplicationProvedList(menteeAppliApproved);
  }, [user]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        const results = menteeAppliApproved.filter((application) => {
          const searchTermLower = searchTerm.toLowerCase();
          if (selectedOption === 'nameMentee') {
            return (
              application.menteeProfile.firstName
                .toLowerCase()
                .includes(searchTermLower) ||
              application.menteeProfile.lastName
                .toLowerCase()
                .includes(searchTermLower)
            );
          } else if (selectedOption === 'idMentee') {
            return application.id.toLowerCase().includes(searchTermLower);
          }

          return false;
        });
        console.log('applicationList', results, applicationList, searchTerm);
        if (results) {
          const appliNoApproved = results.filter(
            (a) => a.status === ApprovalStatus.PENDING
          );
          console.log('appliNoApproved', appliNoApproved);
          setApplicationList(appliNoApproved);
          const appliApproved = results.filter(
            (a) =>
              a.status === ApprovalStatus.APPROVED ||
              a.status === ApprovalStatus.REJECTED
          );
          console.log('appliApproved', appliApproved);
          setApplicationProvedList(appliApproved);
        }

        // setApplicationList(results);
      } else {
        const appliNoApproved = menteeApplications.filter(
          (a) => a.status === ApprovalStatus.PENDING
        );
        setApplicationList(appliNoApproved);
        setApplicationProvedList(menteeAppliApproved);
      }
    }, 1200);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, menteeApplications]);

  // const options = {
  //   title: 'Select date',
  //   autoHide: true,
  //   todayBtn: false,
  //   clearBtn: true,
  //   clearBtnText: 'Clear',
  //   maxDate: new Date('2030-01-01'),
  //   minDate: new Date('1950-01-01'),
  //   icons: {
  //     // () => ReactElement | JSX.Element
  //   },
  //   datepickerClassNames: 'top-12',
  //   defaultDate: new Date(),
  //   language: 'en',
  //   disabledDates: [],
  //   weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  //   inputNameProp: 'date',
  //   inputIdProp: 'date',
  //   inputPlaceholderProp: 'Select Date',
  //   inputDateFormatProp: {
  //     day: 'numeric',
  //     month: 'long',
  //     year: 'numeric',
  //   },
  // };

  const checkIfHasEventOverLap = (newEvents) => {
    return newEvents.some((e) => checkIfEventOverlap(events, e));
  };
  const handleExportFileExcel = () => {
    const jsonData = applicationList.map((a) => applicationToExcelData(a));
    console.log('jsonData', jsonData);
    exportExcel(jsonData, 'application_list');
  };

  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
  };
  const resetSelectedItems = () => {
    setSelectedApplication({});
  };
  const handleSetSelectedItem = (event) => {
    setSelectedApplication({
      ...selectedApplications,
      [event.target.name]: event.target.checked,
    });
  };
  const handleSelectedApplicationChange = () => {
    const selectedTime = [];
    for (const [applicationId, isSelected] of Object.entries(
      selectedApplications
    )) {
      if (isSelected) {
        const application = applicationList.find((a) => a.id === applicationId);
        selectedTime.push(application.learningTime);
      }
    }
    //convert start, end (timestamp) to Date instance
    const filteredSelectedTime = selectedTime.flat().map((t) => ({
      ...t,
      start: new Date(t.start),
      end: new Date(t.end),
    }));

    if (checkIfHasEventOverLap(filteredSelectedTime)) {
      alert('Thời gian bạn chọn không hợp lệ');
      return;
    }
    console.log('selectedTime', filteredSelectedTime, selectedTime);
    setEvents(filteredSelectedTime);
  };
  useEffect(() => {
    handleSelectedApplicationChange();
  }, [selectedApplications]);
  return (
    <Container>
      <ButtonContainer
        style={{
          paddingTop: '1rem',
        }}
      >
        <Label style={{fontSize: '20px', fontWeight: 'bold'}}>
          Danh sách đơn đăng kí
        </Label>
      </ButtonContainer>
      <ButtonContainer
        style={{
          paddingTop: '1rem',
          paddingBottom: '1rem',
        }}
      >
        <div className="flex items-center sm:mb-0 sm:flex ">
          <div style={{display: 'flex'}}>
            <div>
              <TextInput
                id="users-search"
                name="users-search"
                placeholder="Tìm học viên"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="mx-3 " style={{minWidth: 200}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Từ khóa</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedOption}
                label="Từ khóa"
                size="small"
                onChange={(e) => setSelectedOption(e.target.value)}
                defaultValue={selectedOption}
              >
                <MenuItem value={'nameMentee'}>Tên</MenuItem>
                <MenuItem value={'idMentee'}>ID</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* <div className="flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
            <Datepicker
              options={options}
              show={show}
              setShow={handleClose}
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </div> */}
        </div>
        <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
          <Button onClick={handleExportFileExcel} color="gray">
            <div className="flex items-center gap-x-3">
              <HiDocumentDownload className="text-xl" />
              <span>Xuất file</span>
            </div>
          </Button>
        </div>
      </ButtonContainer>
      <div style={{width: '90%'}}>
        <Tabs value={value} onChange={handleChangeValue}>
          <Tab label="Đơn đăng ký" value={0} style={{fontWeight: 'bold'}} />
          <Tab label="Lịch sử duyệt" value={1} style={{fontWeight: 'bold'}} />
        </Tabs>
        {value === 0 && (
          <>
            {applicationList.length > 0 ? (
              <ListApplications
                applications={applicationList}
                selectedApplications={selectedApplications}
                setSelectedApplication={setSelectedApplication}
                resetSelectedItems={resetSelectedItems}
                handleSetSelectedItem={handleSetSelectedItem}
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100px',
                }}
              >
                {menteeApplications.length > 0 ? (
                  <div>
                    <label>Không có đơn đăng kí</label>
                  </div>
                ) : (
                  <ReactLoading type="spin" color="blue" />
                )}
              </div>
            )}
          </>
        )}
        {value === 1 && (
          <>
            {applicationProvedList.length > 0 ? (
              <HistoryApplication applications={applicationProvedList} />
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100px',
                }}
              >
                <label>Không có đơn đăng kí</label>
              </div>
            )}
          </>
        )}
      </div>
      {/* <Pagination /> */}
      <TeachingCalendar
        events={[...mentorEvents, ...events]}
      ></TeachingCalendar>
    </Container>
  );
};

// export const Pagination = () => {
//   return (
//     <div className="sticky bottom-0 right-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
//       <div className="mb-4 flex items-center sm:mb-0">
//         <a
//           href="#"
//           className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//         >
//           <span className="sr-only">Trang trước</span>
//           <HiChevronLeft className="text-2xl" />
//         </a>
//         <a
//           href="#"
//           className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//         >
//           <span className="sr-only">Trang sau</span>
//           <HiChevronRight className="text-2xl" />
//         </a>
//         <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
//           Hiển thị&nbsp;
//           <span className="font-semibold text-gray-900 dark:text-white">
//             1-20
//           </span>
//           &nbsp;tr&nbsp;
//           <span className="font-semibold text-gray-900 dark:text-white">
//             2290
//           </span>
//         </span>
//       </div>
//       <div className="flex items-center space-x-3">
//         <a
//           href="#"
//           className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//         >
//           <HiChevronLeft className="mr-1 text-base" />
//           Trước
//         </a>
//         <a
//           href="#"
//           className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//         >
//           Sau
//           <HiChevronRight className="ml-1 text-base" />
//         </a>
//       </div>
//     </div>
//   );
// };

const Container = styled.div`
  padding: 2rem;
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding: 0 1rem;
`;

export default ApplicationListPage;
