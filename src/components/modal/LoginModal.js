import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import ModalBox, { GetModalTitle, CloseModalBox } from './CommonModalBox';

const LoginBox = styled(ModalBox)`
  height: 309px;
  width: 436px;
  margin-top: -156.5px;
  margin-left: -220px;
`;

const LoginFormBox = styled.form`
  height: 149px;
  width: 337px;
  margin-top: 28px;
`;

const commonFromStyle = css`
  height: 32px;
  width: 332px;
  border: 1px solid #49b0ff;
  border-radius: 12px;
  font-size: 14px;
`;

const LoginInput = styled.input`
  ${commonFromStyle};
  text-align: center;
`;

const LoginPassword = styled(LoginInput)`
  margin-top: 13px;
`;

const LoginSubmit = styled.button`
  ${commonFromStyle};
  height: 34px;
  width: 338px;
  margin-top: 30px;
  background-color: #49b0ff;
  color: white;
  font-size: 16px;
`;

const FindPasswordBtn = styled(Link)`
  margin-top: 32px;
  font-size: 12px;
`;

const LoginModal = ({ onClose }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {},
  });

  return (
    <>
      <LoginBox>
        <CloseModalBox onClose={onClose} />
        <GetModalTitle>로그인</GetModalTitle>
        <LoginFormBox onSubmit={formik.handleSubmit}>
          <LoginInput type='email' name='email' placeholder='이메일 아이디' />
          <LoginPassword
            type='password'
            name='password'
            placeholder='비밀번호'
          />
          <LoginSubmit type='submit'>로그인</LoginSubmit>
        </LoginFormBox>
        <FindPasswordBtn to='/auth/password-find' onClick={onClose}>
          비밀번호 찾기
        </FindPasswordBtn>
      </LoginBox>
    </>
  );
};

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;
