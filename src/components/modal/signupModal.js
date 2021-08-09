import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import ModalBox from './CommonModalBox';

const SignupBox = styled(ModalBox)`
  height: 393px;
  width: 440px;
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
  margin-top: 24px;
  margin-right: 35px;
`;

const ModalTitle = styled.h4`
  font-weight: normal;
  margin-bottom: 0;
`;

const SignupFormBox = styled.form`
  height: 248px;
  width: 340px;
  margin-top: 40px;
`;

const commonFormStyle = css`
  height: 33px;
  width: 333px;
  border: 1px solid #49b0ff;
  border-radius: 12px;
  font-size: 14px;
`;

const FirstFormInput = styled.input`
  ${commonFormStyle};
  text-align: center;
`;

const RestFormInput = styled(FirstFormInput)`
  margin-top: 12px;
`;

const SignupSubmit = styled.button`
  ${commonFormStyle};
  width: 340px;
  margin-top: 31px;
  background-color: #49b0ff;
  color: white;
  font-size: 16px;
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
      <SignupBox>
        <CloseBox onClick={onClose}>
          <CloseSvg src='/svg/close.svg' />
        </CloseBox>
        <ModalTitle>회원가입</ModalTitle>
        <SignupFormBox onSubmit={formik.handleSubmit}>
          <FirstFormInput placeholder='이메일' />
          <RestFormInput type='password' placeholder='비밀번호' />
          <RestFormInput placeholder='이름' />
          <RestFormInput placeholder='닉네임' />
          <SignupSubmit>회원가입</SignupSubmit>
        </SignupFormBox>
      </SignupBox>
    </>
  );
};

SignupModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SignupModal;
