import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import * as Yup from 'yup';

import ModalBox, { CloseBox, CloseSvg, ModalTitle } from './CommonModalBox';

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

// const Warning = styled.p`
//   width: 338px;
//   font-size: 12px;
//   color: #49b0ff;
//   text-align: center;
// `;

const LoginModal = ({ onClose }) => {
  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });
  // const [currFocused, setCurrFocues] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('이메일 형식에 맞지 않습니다').required(),
      password: Yup.string()
        .min(8, '비밀번호는 최소 8글자 이상 입력해주세요.')
        .required(),
    }),
    onSubmit: () => {},
  });

  const handleFocus = e => {
    setFocus({ ...focus, [e.target.name]: false });
    // setCurrFocues(e.target.name);
  };

  const handleBlur = e => {
    formik.handleBlur(e);
    setFocus({ ...focus, [e.target.name]: false });
  };

  return (
    <>
      <LoginBox>
        <CloseBox onClick={onClose}>
          <CloseSvg src='/svg/close.svg' />
        </CloseBox>
        <ModalTitle>로그인</ModalTitle>
        <LoginFormBox onSubmit={formik.handleSubmit}>
          <LoginInput
            name='email'
            onChange={formik.handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder='이메일 아이디'
          />
          <LoginPassword
            type='password'
            name='password'
            onChange={formik.handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder='비밀번호'
          />
          <LoginSubmit type='submit'>로그인</LoginSubmit>
          {/* eslint-disable */}
          {/*{formik.touched.password &&*/}
          {/*  formik.errors.password &&*/}
          {/*  !focus.password &&*/}
          {/*  currFocused === 'password' && (*/}
          {/*    <Warning>{formik.errors.password}</Warning>*/}
          {/*  )*/}
          {/*}*/}
          {/*{formik.touched.email &&*/}
          {/*  formik.errors.email &&*/}
          {/*  !focus.email &&*/}
          {/*  currFocused === 'email' && (*/}
          {/*  <Warning>{formik.errors.email}</Warning>*/}
          {/*)}*/}
          {/* eslint-enable */}
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
