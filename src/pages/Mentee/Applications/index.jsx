import {Article} from '@mui/icons-material';
import {format} from 'date-fns';
import {Checkbox, Label, Modal, Table} from 'flowbite-react';
import {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import {FaCopy} from 'react-icons/fa';
import {useNavigate} from 'react-router';
import menteeApplicationApi from '../../../api/menteeApplication';
import mentorApi from '../../../api/mentor';
import {useUserStore} from '../../../store/userStore';
import {useMenteeAppliStore} from '../../../store/menteeAppliStore';
import {
  handleCopyClick,
  mappingApplicationStatus,
  shortenId,
} from '../../../utils/dataHelper';
import styled from 'styled-components';

function Applications() {
  const [applicationList, setApplicationList] = useState([]);
  const {user} = useUserStore();
  const {menteeApplications, menteeAppliApproved, getMenteeAppliByMenteeId} =
    useMenteeAppliStore();
  const [mentorInfo, setMentorInfo] = useState([]);

  const navigate = useNavigate();
  const handleNavigateToSearchScreen = () => {
    navigate('/mentor/search');
  };

  useEffect(() => {
    const fetchAndSetApplications = async () => {
      try {
        console.log('user', user);
        await getMenteeAppliByMenteeId(user.id);
      } catch (er) {
        console.error(er);
      }
    };

    fetchAndSetApplications();
  }, [user]);

  const getMentorInfor = async (mentorId) => {
    const res = await mentorApi.getMentorById(mentorId);
    return res;
  };

  useEffect(() => {
    const fetchMentorInfo = async (mentorId, index) => {
      const mentorInfo = await getMentorInfor(mentorId);
      setMentorInfo((prevState) => ({
        ...prevState,
        [index]: mentorInfo,
      }));
    };

    menteeApplications.forEach((application, index) => {
      console.log(application);
      fetchMentorInfo(application.mentorId, index);
    });
  }, [menteeApplications]);

  return (
    <Container>
      <ButtonContainer>
        <Label style={{fontSize: '20px', fontWeight: 'bold'}}>
          Danh sách đơn đăng ký
        </Label>
      </ButtonContainer>
      {menteeApplications.length > 0 ? (
        <div
          style={{
            width: '95%',
          }}
        >
          {mentorInfo ? (
            <AllApplications
              applications={menteeApplications}
              mentorInfo={mentorInfo}
            />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div
          className="p-2 border rounded d-flex flex-column justify-content-center align-items-center text-center"
          style={{
            width: '95%',
          }}
        >
          <Article style={{fontSize: '50px'}} />
          <p style={{fontWeight: '500'}}>Không có đơn đăng ký nào</p>
          <p className="text-body-tertiary">
            Khi bạn đăng ký học mentor nào, thông tin của đơn đăng ký sẽ xuất
            hiện tại đây
          </p>
          <Button
            onClick={handleNavigateToSearchScreen}
            style={{fontWeight: '500'}}
            variant="primary"
          >
            Tìm mentor
          </Button>
        </div>
      )}
      {/* <AllApplications applications={applicationList} /> */}
    </Container>
  );
}

const AllApplications = ({applications, mentorInfo}) => {
  const [checkedItems, setCheckedItems] = useState({});
  console.log('Allapplication', applications);
  console.log('mentorInfo', mentorInfo);
  // const handleChange = (event) => {
  //   setCheckedItems({
  //     ...checkedItems,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  return (
    <div style={{minHeight: 500}}>
      <Table className="w-full divide-y divide-gray-600">
        <Table.Head className=" bg-gray-700">
          <Table.HeadCell>Id</Table.HeadCell>
          <Table.HeadCell>Tên mentor</Table.HeadCell>
          <Table.HeadCell>Ngày gửi</Table.HeadCell>
          <Table.HeadCell>Trạng thái</Table.HeadCell>
          <Table.HeadCell>Học phí</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y divide-gray-300 bg-white">
          {applications.map((application, index) => (
            <Table.Row key={index} className="hover:bg-gray-100 ">
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 ">
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
                  src={mentorInfo[index]?.avatar}
                  alt={`${application.id} avatar`}
                />
                <div className="text-sm font-normal text-gray-900">
                  <div className="text-base font-semibold text-gray-900">
                    {mentorInfo[index]?.firstName} {mentorInfo[index]?.lastName}
                  </div>
                  <div className="text-sm font-normal text-gray-500">
                    {mentorInfo[index]?.email}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
                {format(new Date(application.applicationDate), 'dd-MM-yyyy')}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900">
                <div style={{fontWeight: 'bold'}} className="flex items-center">
                  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>{' '}
                  {mappingApplicationStatus(application.status)}
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900">
                {application.fee} VNĐ
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 ">
                {/* <ViewApplicationDetailModal application={application} /> */}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

const Container = styled.div`
  padding-top: 2rem;
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
  width: 95%;
  padding: 0 1rem;
`;

export default Applications;

const ViewApplicationDetailModal = function ({application}) {
  console.log('ViewApplicationDetailModal', application);
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
              display: 'flex',
              flexDirection: 'row',
              color: 'black',
            }}
          >
            <img
              style={{marginBottom: 20}}
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
          <div style={{marginTop: 12}}>
            <Label htmlFor="department">Lý lịch</Label>
            <div className="mt-1">
              <p style={styles.text}>{profileInfor.bio}</p>
            </div>
            <Label style={{marginTop: 12}} htmlFor="department">
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
    color: 'black',
  },
};
