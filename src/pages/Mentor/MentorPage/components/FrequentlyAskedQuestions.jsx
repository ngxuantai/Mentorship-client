import React from 'react'
import styled from 'styled-components';
import {Row, Col} from 'react-bootstrap';

function FrequentlyAskedQuestions() {
  return (
    <Container>
      <Row>
        <Col sm={4}>
          <h2>Câu hỏi thường gặp</h2>
          <span>Không tìm thấy câu cần hỏi? Bạn có thể liên hệ với chúng tôi để hỗ trợ</span>
        </Col>
        <Col sm={8} className='flex flex-col gap-4'>
          <div className='text-lg'>
            <h6 className='font-bold'>Cách thức trang web này hoạt động</h6>
            <span>
              Bạn đang cần tìm người để cố vấn cho vấn đề học tập, hay bạn đang muốn tìm đối tượng để cố vấn để kiếm thêm thu nhập? Website này giúp kết nối hai bên với nhau và đảm bảo trải nghiệm người dùng diễn ra tốt đẹp
            </span>
          </div>
          <div className='text-lg'>
            <h6 className='font-bold'>Liệu có tốn nhiều thời gian không?</h6>
            <span>Chúng tôi hiểu bạn đang bận rộn và muốn sử dụng thời gian của mình để học tập hiệu quả. Đó là lý do chúng tôi thiết kế website này xoay quanh tính hiệu quả. Thời gian bạn đầu tư sẽ luôn nằm trong tầm kiểm soát và dành cho những buổi học hữu ích</span>

          </div>
          <div className='text-lg'>
            <h6 className='font-bold'>Điều chúng tôi mong đợi</h6>
            <span>Chúng tôi luôn mong người dùng website của mình được trải nghiệm tốt nhất. Ngoài ra chúng tôi cũng mong những đánh giá tốt xấu từ người dùng để tiếp tục năng cao trải nghiệm người dùng</span>

          </div>
          
          <div className='text-lg'>        
            <h6 className='font-bold'>Mentors là những ai? </h6>
            <span>Mentors là những người đăng ký đã được chúng tôi kiểm duyệt hồ sơ kỹ lưỡng trước khi cho phép họ có thể cố vấn cho người khác nên những mentees có thể yên tâm về chất lượng của những buổi học</span>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

const Container = styled.div`
  
`;

export default FrequentlyAskedQuestions