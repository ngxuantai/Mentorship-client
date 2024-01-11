import React, {useState} from 'react';
import Tooltip from '@mui/material/Tooltip';
import {Modal, Button, Label, TextInput} from 'flowbite-react';
import learningTestProgressApi from '../../../../api/learningTestProgress';
import {ToastContainer, toast} from 'react-toastify';

export default function CancelTestProgress({endTry, progress, cancelProgress}) {
  const [showModal, setShowModal] = useState(false);
  const [showAddReason, setShowAddReason] = useState(false);
  const [reason, setReason] = useState('');

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  };

  const Close = () => {
    if (showAddReason) {
      cancelProgress();
      toast.success('Đã kết thúc học thử', toastOptions);
    }
    setShowModal(false);
    setShowAddReason(false);
    setReason('');
  };

  const handCancelLearning = async () => {
    progress.cancelStatus = true;
    await learningTestProgressApi.update(progress);
    setShowAddReason(true);
  };

  const handleSendReason = async () => {
    if (!reason) {
      return;
    } else {
      progress.reasonCancel = reason;
      await learningTestProgressApi.update(progress);
      Close();
    }
  };

  return (
    <>
      <Tooltip title="Kết thúc">
        <Button disabled={endTry} onClick={() => setShowModal(true)}>
          Kết thúc
        </Button>
      </Tooltip>
      <Modal show={showModal} onClose={() => Close()}>
        <Modal.Header className="p-6 text-base">Kết thúc học thử</Modal.Header>
        <Modal.Body>
          {showAddReason ? (
            <>
              <div className="space-y-6">
                <Label style={{fontSize: '16px', fontWeight: 'bold'}}>
                  Lý do gì khiến bạn muốn kết thúc học thử?
                </Label>
                <TextInput
                  onChange={(e) => setReason(e.target.value)}
                  style={{
                    fontSize: '16px',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  gap: '8px',
                  marginTop: '24px',
                }}
              >
                <Button onClick={() => handleSendReason()}>Gửi</Button>
                <Button color="failure" onClick={() => Close()}>
                  Kết thúc
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-6">
                <Label style={{fontSize: '16px', fontWeight: 'bold'}}>
                  Bạn muốn kết thúc học thử ngay bây giờ?
                </Label>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  gap: '8px',
                  marginTop: '24px',
                }}
              >
                <Button onClick={() => Close()}>Hủy</Button>
                <Button color="failure" onClick={() => handCancelLearning()}>
                  Kết thúc
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}
