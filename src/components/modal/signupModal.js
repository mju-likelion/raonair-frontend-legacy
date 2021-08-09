import PropTypes from 'prop-types';
import styled from 'styled-components';

import ModalBox from './CommonModalBox';

const SignupBox = styled(ModalBox)`
  height: 397px;
  width: 444px;
  margin-top: -198.5px;
  margin-left: -222px;
  background-color: gray;
`;

const SignupModal = ({ onClose }) => {
  return (
    <>
      <SignupBox onClick={onClose} />
    </>
  );
};

SignupModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SignupModal;
