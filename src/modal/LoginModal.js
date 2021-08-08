import styled from 'styled-components';

import ModalBox from './CommonModalBox';
import ModalPortal from './ModalPortal';

const LoginBox = styled(ModalBox)`
  height: 313px;
  width: 440px;
  margin-top: -156.5px;
  margin-left: -220px;
  background-color: gray;
`;

const LoginModal = () => {
  return (
    <ModalPortal>
      <LoginBox />
    </ModalPortal>
  );
};

export default LoginModal;
