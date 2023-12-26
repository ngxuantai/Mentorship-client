import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Table, TextInput, Button} from 'flowbite-react';
import {format} from 'date-fns';

export default function ListFile({files}) {
  console.log('files', files);
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
          <Table.HeadCell style={{width: '15%'}}>Loại</Table.HeadCell>
          <Table.HeadCell style={{width: '15%'}}>Kich thước</Table.HeadCell>
        </Table.Head>

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
      </Table>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  width: 90%;
  //   display: flex;
  //   flex-direction: column;
  //   gap: 20px;
`;
