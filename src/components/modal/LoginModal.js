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

const LoginModal = ({ onClose }) => {
  return (
    <>
      <LoginBox />
      <button onClick={onClose} type='button'>
        Close
      </button>
    </>
  );
};

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;
