import PropTypes from 'prop-types';
import styled from 'styled-components';

import ModalBox from './CommonModalBox';

const LoginBox = styled(ModalBox)`
  height: 313px;
  width: 440px;
  margin-top: -156.5px;
  margin-left: -220px;
  background-color: gray;
`;

const CloseBox = styled.div`
  width: 440px;
  height: 15px;
  display: flex;
  flex-direction: row-reverse;
`;

const CloseSvg = styled.img`
  width: 15px;
  height: 15px;
  margin-top: 28px;
  margin-right: 33px;
`;

const LoginModal = ({ onClose }) => {
  return (
    <>
      <LoginBox>
        <CloseBox>
          <CloseSvg src='/svg/close.svg' onClick={onClose} />
        </CloseBox>
      </LoginBox>
    </>
  );
};

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;
