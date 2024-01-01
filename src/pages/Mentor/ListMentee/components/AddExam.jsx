import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import {Button, Label, Modal} from 'flowbite-react';
import {HiOutlineEye} from 'react-icons/hi';
import {PiExamFill} from 'react-icons/pi';
import {format} from 'date-fns';
import {ApprovalStatus} from '../../../../constants';
import {useMenteeAppliStore} from '../../../../store/menteeAppliStore';
import examApi from '../../../../api/exam';
import mneteeExamApi from '../../../../api/menteeExam';
import {ToastContainer, toast} from 'react-toastify';

export default function AddExam({application}) {
  const [isOpen, setOpen] = useState(false);
  const [isShow, setShow] = useState(false);

  const [listExam, setListExam] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  };

  const closeModal = () => {
    if (isOpen && !isShow) {
      setOpen(false);
    }
    setShow(false);
  };

  useEffect(() => {
    const fetchListExam = async () => {
      try {
        console.log('application', application.mentorId);
        const response = await examApi.getExamByMentorId(application.mentorId);
        console.log('response', response);
        setListExam(response);
      } catch (error) {
        console.log('failed to fetch exam list: ', error);
      }
    };
    fetchListExam();
  }, []);

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

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const handleSentExam = async () => {
    selectedOptions.map(async (option) => {
      try {
        const examId = option.value;
        const mentorId = application.mentorId;
        const menteeId = application.menteeProfile.id;
        const response = await mneteeExamApi.createMenteeExam(
          examId,
          mentorId,
          menteeId
        );
        console.log('response', response);
      } catch (error) {
        console.log('failed to create mentee exam: ', error);
      }
    });
    setSelectedOptions([]);
    setOpen(false);
    toast.success('Gửi bài tập thành công', toastOptions);
  };
  return (
    <>
      <Button color="blue" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <PiExamFill className="text-lg" />
          Gửi bài tập
        </div>
      </Button>
      <Modal style={{}} onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header
          className="border-b border-gray-200 dark:border-gray-700"
          style={{padding: '1.5rem'}}
        >
          <strong>Gửi bài tập</strong>
        </Modal.Header>
        <div className="mb-6" style={{flex: '1 1 0%', padding: '1.5rem'}}>
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-2">
                <PiExamFill className="text-lg" />
                <strong>Danh sách bài tập</strong>
              </div>
            </div>
            <div className="mt-4">
              <Label className="mb-2">Chọn bài tập</Label>
              <Select
                value={selectedOptions}
                options={listExam.map((exam) => ({
                  value: exam.id,
                  label: exam.name,
                }))}
                onChange={handleSelectChange}
                isMulti
              />
            </div>
          </div>
        </div>
        <Modal.Footer
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
            }}
          >
            <Button
              style={{alignSelf: 'flex-end', marginLeft: 'auto'}}
              color="blue"
              onClick={() => handleSentExam()}
            >
              Gửi
            </Button>
            <Button
              style={{alignSelf: 'flex-end', marginLeft: 'auto'}}
              color="gray"
              onClick={() => setOpen(false)}
            >
              Đóng
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}
