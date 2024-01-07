import {useState, useEffect} from 'react';
import {
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
  FloatingLabel,
} from 'flowbite-react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Datepicker from 'tailwind-datepicker-react';
import {HiDocumentDownload} from 'react-icons/hi';
import Mentees from './components/Mentees';
// import {useApplicationStore} from '../../store/application';
import {useUserStore} from '../../../store/userStore';
import {useMenteeAppliStore} from '../../../store/menteeAppliStore';
import {applicationToExcelData} from '../../../utils/excelDataHelper';
import {exportExcel} from '../../../utils/excelHelper';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import menteeApplicationApi from '../../../api/menteeApplication';

const dropdownOption = [
  {value: 'id', label: 'Id'},
  {value: 'displayName', label: 'Tên học viên'},
];

const ListMentee = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [menteeList, setMenteeList] = useState([]);

  const [selectedOption, setSelectedOption] = useState('nameMentee');

  const [show, setShow] = useState(false);
  const [isNoData, setIsNoData] = useState(false);

  const {menteeAppliApproved, setMenteeApplications, getMenteeAppliByMentorId} =
    useMenteeAppliStore();
  const {user} = useUserStore();

  const handleClose = (state) => {
    setShow(state);
  };

  useEffect(() => {
    const fetchAndSetApplications = async () => {
      try {
        await getMenteeAppliByMentorId(user.id);
      } catch (er) {
        console.error(er);
      }
    };

    fetchAndSetApplications();
    setMenteeList(menteeAppliApproved);
  }, [user]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        // setIsLoading(true);
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

        // console.log('applicationList', results, applicationList, searchTerm);
        setMenteeList(results);
        if (results.length === 0) {
          setIsNoData(true);
        } else {
          setIsNoData(false);
        }

        // setIsLoading(false);
      } else {
        setMenteeList(menteeAppliApproved);
      }
    }, 1200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedOption, selectedDate, menteeAppliApproved]);
  //   useEffect(() => {
  //     const applicationsWithUser = applications.map((application) => {
  //       // const user = await getUserById(application.mentorId);
  //       return {...user, ...application};
  //     });
  //     setApplicationList(applicationsWithUser);
  //     console.log('applicationWIghtUser', applicationsWithUser);
  //   }, [applications]);
  //   console.log('applications', applications);
  //   const handleChange = (date) => {
  //     setSelectedDate(date);
  //     console.log(('seletedDate', date.getTime()));
  //     const filtered = data.filter((application) => {
  //       const month = application.submitDate.getMonth();
  //       const year = application.submitDate.getFullYear();
  //       const d = application.submitDate.getDate();

  //       const submitDate = new Date(year, month, d).getTime();

  //       console.log('submitDate', submitDate, date.getTime());
  //       return submitDate === date.getTime();
  //     });
  //     // setApplications(filtered);
  //   };

  const options = {
    title: 'Chọn ngày',
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
    inputPlaceholderProp: 'Chọn ngày',
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

  return (
    <Container>
      <ButtonContainer
        style={{
          paddingTop: '1rem',
        }}
      >
        <Label style={{fontSize: '20px', fontWeight: 'bold'}}>
          Danh sách học viên
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
      {menteeList.length > 0 ? (
        <div
          style={{
            width: '90%',
          }}
        >
          {menteeList && <Mentees applications={menteeList} />}
        </div>
      ) : (
        <>
          {isNoData ? (
            <Mentees applications={menteeList} />
          ) : (
            <ReactLoading type="spin" color="blue" />
          )}
        </>
      )}
    </Container>
  );
};

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

export default ListMentee;
