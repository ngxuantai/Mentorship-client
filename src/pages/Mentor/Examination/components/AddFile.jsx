import React, {useState, useEffect} from 'react';
import {Button} from '@mui/material';
import {Label, Modal, TextInput} from 'flowbite-react';
import Select from 'react-select';
import {fileApi, folderApi} from '../../../../api/file';
import {format} from 'date-fns';
import firebaseInstance from '../../../../services/firebase';
import {useUserStore} from '../../../../store/userStore';

export default function AddFile({folderDeatil}) {
  const [listFolder, setListFolder] = useState([]); // [folder1, folder2, ...
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [isShow, setShow] = useState(false);
  const {user, setUser} = useUserStore();

  useEffect(() => {
    const fetchFolders = async () => {
      const res = await folderApi.getFoldersByMentorId(user.id);
      console.log(res);
      setListFolder(res);
    };

    fetchFolders();
  }, []);

  const closeModal = () => {
    if (isOpen && !isShow) {
      setOpen(false);
    }
    setShow(false);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    // const fileNames = Array.from(files).map((file) => file.name);
    setSelectedFiles(files);
  };

  const handleUploadFile = () => {
    selectedFiles.forEach((file) => {
      console.log(file);
      let fileData = {
        mentorId: user.id,
        name: file.name,
        link: '',
        size: file.size,
        type: file.type,
        createdDate: new Date().toISOString(),
      };
      firebaseInstance
        .storeFile('files', file, fileData.mentorId)
        .then(async (url) => {
          fileData.link = url;
          const data = await fileApi.createFile(fileData, selectedOption.value);
        });
    });

    setSelectedFiles([]);
    setSelectedOption([]);
    closeModal();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Thêm tài liệu
      </Button>
      <Modal style={{}} onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 dark:border-gray-700">
          {/* <strong>Thêm tài liệu</strong> */}
          Thêm tài liệu
        </Modal.Header>
        <div style={{flex: '1 1 0%', padding: '1.5rem'}}>
          <div>
            <div>
              <Label className="mb-2">Chọn thư mục</Label>
              <Select
                // defaultValue={
                //   folderDeatil.id !== undefined ? folderDeatil.id : null
                // }
                options={listFolder.map((folder) => ({
                  value: folder.id,
                  label: folder.name,
                }))}
                onChange={handleSelectChange}
                className="mb-2"
              />
              <Label className="mb-2 mt-4">Chọn tài liệu</Label>
              <TextInput
                placeholder="Chọn tài liệu"
                type="file"
                multiple
                accept=".pdf, .docx, .doc, .xlsx, .xls, .ppt, .pptx, .txt"
                onChange={handleFileChange}
                className="mb-2"
              />
            </div>
          </div>
        </div>
        <Modal.Footer>
          <Button
            style={{alignSelf: 'flex-end', marginLeft: 'auto'}}
            variant="contained"
            color="primary"
            onClick={() => handleUploadFile()}
          >
            Upload
          </Button>
        </Modal.Footer>
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
