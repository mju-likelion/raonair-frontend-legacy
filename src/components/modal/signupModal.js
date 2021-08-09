import { useFormik } from 'formik';
import PropTypes from 'prop-types';
// import styled, { css } from 'styled-components';
import styled from 'styled-components';

import ModalBox from './CommonModalBox';

const SignupBox = styled(ModalBox)`
  height: 391px;
  width: 438px;
  margin-top: -198.5px;
  margin-left: -222px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseBox = styled.div`
  width: 438px;
  height: 9px;
  display: flex;
  flex-direction: row-reverse;
`;

const CloseSvg = styled.img`
  width: 15px;
  height: 15px;
  margin-top: 28px;
  margin-right: 37px;
`;

const ModalTitle = styled.h4`
  font-weight: normal;
  margin-bottom: 0;
`;

// const commonFormStyle = css`
//   height: 35px;
//   width: 340px;
//   border: 1px solid #49b0ff;
//   border-radius: 12px;
// `;

const SignupFormBox = styled.form`
  height: 248px;
  width: 340px;
  margin-top: 31px;
  background-color: red;
`;

const SignupModal = ({ onClose }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      nickName: '',
    },
    onSubmit: () => {},
  });

  return (
    <>
      <SignupBox onClick={onClose}>
        <CloseBox>
          <CloseSvg src='/svg/close.svg' />
        </CloseBox>
        <ModalTitle>회원가입</ModalTitle>
        <SignupFormBox onSubmit={formik.handleSubmit} />
      </SignupBox>
    </>
  );
};

SignupModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SignupModal;
