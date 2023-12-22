import React, {useState, useEffect} from 'react';
import {Button, Label, Modal} from 'flowbite-react';
import {HiOutlineEye} from 'react-icons/hi';
import {format} from 'date-fns';
import {ApprovalStatus} from '../../../../constants';

export default function ViewApplicationDetail({application}) {
  console.log('application6', application);
  const menteeProfile = application.menteeProfile;
  const [isOpen, setOpen] = useState(false);
  const [isShow, setShow] = useState(false);

  const closeModal = () => {
    if (isOpen && !isShow) {
      setOpen(false);
    }
    setShow(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.getElementById('modal');
      if (modal && !modal.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Button color="blue" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiOutlineEye className="text-lg" />
          Xem
        </div>
      </Button>
      <Modal style={{}} onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Thông tin học viên</strong>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <img
              style={{marginRight: 20}}
              src={menteeProfile.avatar}
              width={200}
              height={160}
            ></img>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label style={{fontWeight: 'bold'}} htmlFor="firstName">
                  Họ và tên:{' '}
                </Label>
                <div className="mt-1">
                  <p style={styles.text}>
                    {menteeProfile.firstName + ' ' + menteeProfile.lastName}
                  </p>
                </div>
              </div>
              <div>
                <Label style={{fontWeight: 'bold'}} htmlFor="lastName">
                  Ngày sinh:{' '}
                </Label>
                <div className="mt-1">
                  <p style={styles.text}>
                    {format(new Date(menteeProfile.dateOfBirth), 'dd-MM-yyyy')}
                  </p>
                </div>
              </div>
              <div>
                <Label style={{fontWeight: 'bold'}} htmlFor="phone">
                  Số điện thoại:{' '}
                </Label>
                <div className="mt-1">
                  <p style={styles.text}>{menteeProfile.phoneNumber}</p>
                </div>
              </div>
              <div>
                <Label style={{fontWeight: 'bold'}} htmlFor="email">
                  Email:{' '}
                </Label>
                <div className="mt-1">
                  <p style={styles.text}>{menteeProfile.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{marginTop: 12}}>
            <Label style={{fontWeight: 'bold'}} htmlFor="department">
              Giới thiệu bản thân:
            </Label>
            <div className="mt-1">
              <p style={styles.text}>
                {application.personalDescription || 'Không có'}
              </p>
            </div>
            <Label style={{marginTop: 12}} htmlFor="department">
              Mong đợi của học viên:
            </Label>
            <div className="mt-1">
              <p style={styles.text}>{application.expectation || 'Không có'}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{alignSelf: 'flex-end', marginLeft: 'auto'}}
            color="blue"
            onClick={() => setOpen(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        onClick={(e) => e.stopPropagation()}
        style={{}}
        onClose={() => setShow(false)}
        show={isShow}
      >
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Chứng chỉ</strong>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              style={{marginRight: 20}}
              src="https://picsum.photos/200/300"
              width={200}
              height={160}
            ></img>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

const styles = {
  div: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    color: 'black',
    margin: 0,
  },
};
