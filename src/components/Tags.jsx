import styled from 'styled-components';
export const SkillTag = styled.div`
  border-radius: 12px;
  margin-bottom: 4px;
  font-weight: bold;

  display: inline-block;
  padding: 3px 8px;
  background-color: #f0f0f0;
  cursor: pointer; // Cho phép con trỏ thành dạng bàn tay khi hover
  transition: background-color 0.3s; // Tạo hiệu ứng thay đổi màu nền mềm mại

  &:hover {
    background-color: #e0e0e0; // Màu nền khi hover
  }

  &:active {
    background-color: #c0c0c0; // Màu nền khi được nhấn
  }
`;
