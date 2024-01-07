import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Table, TextInput, Label} from 'flowbite-react';
import {Button} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {fileApi} from '../../../../api/file';
import firebaseInstance from '../../../../services/firebase';
import {format} from 'date-fns';
import {useUserStore} from '../../../../store/userStore';
import mentorApi from '../../../../api/mentor';
import {saveAs} from 'file-saver';

export default function ListFile({menteeFiles}) {
  const {user, setUser} = useUserStore();

  const [listFiles, setListFiles] = useState([]);
  const [listMentors, setListMentors] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      menteeFiles.map(async (file, index) => {
        const res = await fileApi.getFileById(file.fileId);
        console.log(res);
        setListFiles((listFiles) => ({...listFiles, [index]: res}));
      });
    };

    const fetchMentors = async () => {
      menteeFiles.map(async (file, index) => {
        const res = await mentorApi.getMentorById(file.mentorId);
        console.log(res);
        setListMentors((listMentors) => ({...listMentors, [index]: res}));
      });
    };

    fetchMentors();
    fetchFiles();
  }, [menteeFiles]);

  useEffect(() => {
    console.log('listFiles', listFiles[0]);
  }, [listFiles]);

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

  const downloadFile = async () => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      saveAs(blob, fileName);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
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
          <Table.HeadCell>Tên</Table.HeadCell>
          <Table.HeadCell>Người gửi</Table.HeadCell>
          <Table.HeadCell>Ngày gửi</Table.HeadCell>
          <Table.HeadCell>Loại</Table.HeadCell>
          <Table.HeadCell>Kich thước</Table.HeadCell>
          <Table.HeadCell>Tải xuống</Table.HeadCell>
        </Table.Head>
        {menteeFiles.length > 0 && listFiles[0] && listMentors[0] ? (
          <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
            {menteeFiles.map((file, index) => (
              <Table.Row
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-black dark:text-white">
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      {listFiles[index].name}
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={listMentors[index].avatar}
                    alt={`${listMentors[index].firstName} avatar`}
                  />
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      {listMentors[index].firstName +
                        ' ' +
                        listMentors[index].lastName}
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base text-black dark:text-white">
                  {format(new Date(file.createdAt), 'dd-MM-yyyy')}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base text-black dark:text-white">
                  {convertTypeToExtension(listFiles[index].type)}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base text-black dark:text-white">
                  {(listFiles[index].size / 1024).toFixed(1) + ' KB'}
                </Table.Cell>
                <Table.Cell>
                  <div>
                    <a
                      href={listFiles[index].link}
                      //   download="your-desired-file-name.docx"
                    >
                      Download File
                    </a>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        ) : null}
      </Table>
      {menteeFiles.length === 0 ? (
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
