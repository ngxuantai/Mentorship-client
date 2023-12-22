import React, {useState} from 'react';
// import {format} from 'date-fns';
// import {FaCopy} from 'react-icons/fa';
// import {shortenId} from '../../../../utils/shortenId';
import {Button, Modal} from 'flowbite-react';
import {HiOutlineExclamationCircle, HiX} from 'react-icons/hi';
import {ApprovalStatus} from '../../../../constants';
import {useMenteeAppliStore} from '../../../../store/menteeAppli';

export default function RejectedApplication({application}) {
  const {updateMenteeAppliStatus} = useMenteeAppliStore();

  const [isOpen, setOpen] = useState(false);
  //   const {applications, updateApplicationStatus} = useApplicationStore();

  const handleRejectApplication = async () => {
    try {
      await updateMenteeAppliStatus(application.id, ApprovalStatus.REJECTED);
      //   await updateApplicationStatus(application.id, ApplicationStatus.REJECTED);
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
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-6 pb-0 pt-6">
          <span className="sr-only">Delete user</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-500" />
            <p className="text-xl text-gray-500">
              Are you sure you want to delete this user?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" onClick={() => handleRejectApplication()}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
