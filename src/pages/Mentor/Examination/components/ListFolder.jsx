import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Table, TextInput, Button, Label} from 'flowbite-react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListFile from './ListFile';
import {format, set} from 'date-fns';
import {folderApi} from '../../../../api/file';

export default function ListFolder({folders}) {
  const [listFolder, setListFolder] = useState(folders); // [folder1, folder2, ...
  const [addingFolder, setAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [folderDetail, setFolderDetail] = useState({}); // {name: 'folder1', files: [file1, file2, ...]
  const [showDetail, setShowDetail] = useState(false);

  const handleAddFolder = async () => {
    const newFolder = {
      mentorId: '65840127a47c189dd995cdf3',
      name: newFolderName,
      createdDate: new Date().toISOString(),
    };
    console.log(newFolder);
    const res = await folderApi.createFolder(newFolder);
    setListFolder([...listFolder, res]);
    setAddingFolder(false);
    setNewFolderName('');
  };

  const handleDetailFolder = (folder) => {
    console.log(folder);
    setShowDetail(true);
    setFolderDetail(folder);
  };

  return (
    <Container>
      <ButtonContainer>
        <div>
          <Label style={{fontSize: '20px', fontWeight: 'bold'}}>
            Danh sách tài liệu
          </Label>
          <Label style={{fontSize: '16px'}}>
            {showDetail && <ChevronRightIcon />}{' '}
            {showDetail && folderDetail.name}
          </Label>
        </div>
        <Button onClick={() => handleAddExam()}>Thêm tài liệu</Button>
      </ButtonContainer>
      {showDetail ? (
        <ListFile />
      ) : (
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
            <Table.HeadCell style={{width: '40%'}}>Ngày đăng</Table.HeadCell>
            <Table.HeadCell style={{display: 'flex', justifyContent: 'center'}}>
              <Button
                onClick={() => {
                  setAddingFolder(true);
                }}
              >
                Thêm
              </Button>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
            {listFolder.map((folder, index) => (
              <Table.Row
                key={index}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleDetailFolder(folder)}
              >
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-black dark:text-white">
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      {folder.name}
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base text-black dark:text-white">
                  {format(new Date(folder.createdDate), 'dd-MM-yyyy')}
                </Table.Cell>
              </Table.Row>
            ))}
            {addingFolder && (
              <Table.Row>
                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-black dark:text-white">
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      <TextInput
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        placeholder="Nhập tên folder..."
                      />
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap p-4 text-base text-black dark:text-white">
                  {format(new Date(), 'dd-MM-yyyy')}
                </Table.Cell>
                <Table.Cell>
                  <div style={{display: 'flex', gap: '10px'}}>
                    <Button
                      style={{width: '50px'}}
                      color="blue"
                      onClick={() => handleAddFolder()}
                    >
                      <CheckIcon />
                    </Button>
                    <Button
                      style={{width: '50px'}}
                      color="failure"
                      onClick={() => {
                        setAddingFolder(false);
                        setNewFolderName('');
                      }}
                    >
                      <CloseIcon />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      )}
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;
