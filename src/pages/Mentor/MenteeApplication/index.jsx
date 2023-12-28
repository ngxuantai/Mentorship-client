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
import Datepicker from 'tailwind-datepicker-react';
import Select from 'react-select';
import {useState, useEffect} from 'react';
import {
  HiChevronLeft,
  HiChevronRight,
  HiDocumentDownload,
} from 'react-icons/hi';
import {useMenteeAppliStore} from '../../../store/menteeAppli';
import {applicationToExcelData} from '../../../utils/excelDataHelper';
import {exportExcel} from '../../../utils/excelHelper';
import ListApplications from './components/ListApplications';
import HistoryApplication from './components/HistoryApplication';

const dropdownOption = [
  {value: 'id', label: 'Id'},
  {value: 'displayName', label: 'Tên học viên'},
];

const ApplicationListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [applicationList, setApplicationList] = useState([]);

  const [selectedOption, setSelectedOption] = useState(dropdownOption[1]);

  const [show, setShow] = useState(false);
  const [value, setValue] = useState(0);

  const {
    menteeApplications,
    menteeAppliApproved,
    setMenteeApplications,
    getMenteeAppliByMentorId,
  } = useMenteeAppliStore();
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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        const results = applicationsWithUser.filter((application) =>
          application[selectedOption.value]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        console.log('applicationList', results, applicationList, searchTerm);
        setApplicationList(results);
      } else {
        setApplicationList(menteeApplications);
      }
    }, 1200);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, menteeApplications]);

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
    const jsonData = applicationList.map((a) => applicationToExcelData(a));
    console.log('jsonData', jsonData);
    exportExcel(jsonData, 'application_list');
  };

  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Danh sách học viên đăng kí
            </h1>
          </div>
          <div className="sm:flex">
            <div className="flex hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Tìm kiếm
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput
                    id="users-search"
                    name="users-search"
                    placeholder="Tìm đơn đăng kí"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>
              <div style={{marginRight: 8, minWidth: 200}}>
                <Select
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      color: 'black',
                      // backgroundColor: '#374151',
                    }),
                    singleValue: (baseStyles, state) => ({
                      ...baseStyles,
                      color: 'black',
                      // backgroundColor: '#374151',
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      // color: '#374151',
                    }),
                  }}
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={dropdownOption}
                />
              </div>
              <div className="flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                <Datepicker
                  options={options}
                  show={show}
                  setShow={handleClose}
                />
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              <Button onClick={handleExportFileExcel} color="gray">
                <div className="flex items-center gap-x-3">
                  <HiDocumentDownload className="text-xl" />
                  <span>Xuất file</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <Tabs value={value} onChange={handleChangeValue}>
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
                <ListApplications applications={applicationList} />
              )}
              {value === 1 && (
                <HistoryApplication applications={menteeAppliApproved} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </div>
  );
};

export const Pagination = () => {
  return (
    <div className="sticky bottom-0 right-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
      <div className="mb-4 flex items-center sm:mb-0">
        <a
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Trang trước</span>
          <HiChevronLeft className="text-2xl" />
        </a>
        <a
          href="#"
          className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Trang sau</span>
          <HiChevronRight className="text-2xl" />
        </a>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Hiển thị&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            1-20
          </span>
          &nbsp;tr&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            2290
          </span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <HiChevronLeft className="mr-1 text-base" />
          Trước
        </a>
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Sau
          <HiChevronRight className="ml-1 text-base" />
        </a>
      </div>
    </div>
  );
};

export default ApplicationListPage;
