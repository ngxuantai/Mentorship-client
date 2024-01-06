import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Table, TextInput, Label} from 'flowbite-react';
import {Button} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {fileApi} from '../../../../api/file';
import firebaseInstance from '../../../../services/firebase';
import {format} from 'date-fns';
import {useUserStore} from '../../../../store/userStore';

export default function ListFile({folder}) {
  const [files, setFiles] = useState([]);
  const {user, setUser} = useUserStore();

  useEffect(() => {
    const ftechFiles = async () => {
      folder.fileIds.map(async (fileId) => {
        const file = await fileApi.getFileById(fileId.id);
        setFiles((files) => [...files, file]);
      });
    };

    ftechFiles();
  }, []);

  useEffect(() => {
    console.log('files', files);
  }, [files]);
  // chuyển file.type thành các extension
  const convertTypeToExtension = (type) => {
    switch (type) {
      case 'application/pdf':
        return 'pdf';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'docx';
      case 'application/msword':
        return 'doc';
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'xlsx';
      case 'application/vnd.ms-excel':
        return 'xls';
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return 'pptx';
      case 'application/vnd.ms-powerpoint':
        return 'ppt';
      case 'text/plain':
        return 'txt';
      default:
        return 'file';
    }
  };

  const handleAddFile = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf, .docx, .doc, .xlsx, .xls, .ppt, .pptx, .txt';
    input.multiple = true;
    // storeFile();

    input.addEventListener('change', (event) => {
      const filesInput = event.target.files;

      filesInput.forEach((file) => {
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
            const data = await fileApi.createFile(fileData, folder.id);
            setFiles([...files, data]);
          });
      });
    });

    // Kích hoạt sự kiện click trên input
    input.click();
  };

  return (
    <Container>
      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <Table.Head
          className="bg-gray-100 dark:bg-gray-700"
          style={{
            fontSize: '1rem',
            textTransform: 'none',
            color: 'black',
          }}
        >
          <Table.HeadCell style={{width: '55%'}}>Tên</Table.HeadCell>
          <Table.HeadCell style={{width: '15%'}}>Ngày đăng</Table.HeadCell>
          <Table.HeadCell style={{width: '12%'}}>Loại</Table.HeadCell>
          <Table.HeadCell style={{width: '15%'}}>Kich thước</Table.HeadCell>
          <Table.HeadCell>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleAddFile()}
            >
              <UploadFileIcon />
            </Button>
          </Table.HeadCell>
        </Table.Head>
        {files.length > 0 ? (
          <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
            {files.map((file, index) => (
              <Table.Row
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-black dark:text-white">
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      {file.name}
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base text-black dark:text-white">
                  {format(new Date(file.createdDate), 'dd-MM-yyyy')}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base text-black dark:text-white">
                  {convertTypeToExtension(file.type)}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base text-black dark:text-white">
                  {(file.size / 1024).toFixed(1) + ' KB'}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        ) : null}
      </Table>
      {files.length === 0 ? (
        <Label className="whitespace-nowrap p-4 text-base font-medium text-black dark:text-white">
          Chưa có tài liệu
        </Label>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  //   display: flex;
  //   flex-direction: column;
  //   gap: 20px;
`;
