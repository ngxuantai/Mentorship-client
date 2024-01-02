import styled from 'styled-components';
export const SkillTag = styled.div`
  border-radius: 9999px;
  margin-bottom: 4px;
  margin-right: 8px;
  font-weight: 500;

  display: inline-block;
  padding: 0.375rem 1rem;
  background-color: #f0f0f0;
  transition: background-color 0.3s; // Tạo hiệu ứng thay đổi màu nền mềm mại

  &:hover {
    background-color: #e0e0e0; // Màu nền khi hover
  }

  &:active {
    background-color: #c0c0c0; // Màu nền khi được nhấn
  }
`;
