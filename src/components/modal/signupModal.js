import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import ModalBox, { CloseBox, CloseSvg, ModalTitle } from './CommonModalBox';

const SignupBox = styled(ModalBox)`
  height: 393px;
  width: 440px;
  margin-top: -198.5px;
  margin-left: -222px;
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
          <FirstFormInput type='email' name='email' placeholder='이메일' />
          <RestFormInput
            type='password'
            name='password'
            placeholder='비밀번호'
          />
          <RestFormInput name='name' placeholder='이름' />
          <RestFormInput name='nickName' placeholder='닉네임' />
          <SignupSubmit type='submit'>회원가입</SignupSubmit>
        </SignupFormBox>
      </SignupBox>
    </>
  );
};

SignupModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SignupModal;
