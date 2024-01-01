import {useState} from 'react';
// import {format} from 'date-fns';
// import {FaCopy} from 'react-icons/fa';
// import {shortenId} from '../../../../utils/shortenId';
import {TextField} from '@mui/material';
import {Button, Modal} from 'flowbite-react';
import {HiX} from 'react-icons/hi';
import {ApprovalStatus} from '../../../../constants';
import {useMenteeAppliStore} from '../../../../store/menteeAppliStore';

export default function RejectedApplication({application}) {
  const {updateMenteeAppliStatus, updateMenteeApplication} =
    useMenteeAppliStore();

  const [isOpen, setOpen] = useState(false);
  const [reason, setReason] = useState('');

  const handleInputChange = (event) => {
    setReason(event.target.value);
  };

  const handleRejectApplication = async () => {
    try {
      //TODO: chỉ cần 1 update API
      await updateMenteeAppliStatus(application.id, ApprovalStatus.REJECTED);
      await updateMenteeApplication(application.id, {
        ...application,
        status: ApprovalStatus.REJECTED,
        reason,
      });
      setOpen(false);
    } catch (er) {
      console.error('update application er', er);
    }
  };

  return (
    <>
      <Button
        disabled={
          application.status === ApprovalStatus.APPROVED ||
          application.status === ApprovalStatus.REJECTED
        }
        color="failure"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-x-2">
          <HiX className="text-lg" />
          Từ chối
        </div>
      </Button>
      <Modal
        style={{minWidth: '50%'}}
        onClose={() => setOpen(false)}
        show={isOpen}
        size="md"
      >
        <Modal.Header className="px-6 pb-0 pt-6"></Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <p className="text-xl text-gray-500">
              Bạn có muốn huỷ đơn đăng ký này?
            </p>
            <TextField // Add the TextField component
              label="Lý do từ chối (tuỳ chọn) "
              variant="outlined"
              value={reason}
              style={{width: '100%'}}
              multiline
              rows={4}
              onChange={handleInputChange}
            />
            <div
              style={{alignSelf: 'flex-end'}}
              className="flex items-center gap-x-3"
            >
              <Button color="failure" onClick={() => handleRejectApplication()}>
                Từ chối
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                Huỷ
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
