import { useState } from 'react';
import styled from 'styled-components';

import LoginModal from './modal/LoginModal';
import Portal from './modal/Portal';
import SignupModal from './modal/signupModal';

const HeaderBox = styled.div`
  height: 64px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
`;

const HeaderLogo = styled.img`
  height: 34px;
  width: 102.34px;
  margin-left: 48px;
`;

const ButtonBox = styled.div`
  height: 36px;
  width: 155px;
  margin-right: 62px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderButton = styled.div`
  height: 36px;
  width: 73px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const toggleLoginModalOpen = () => {
    setLoginModalOpen(!loginModalOpen);
    setSignupModalOpen(false);
  };

  const toggleSignupModalOpen = () => {
    setSignupModalOpen(!signupModalOpen);
    setLoginModalOpen(false);
  };

  return (
    <>
      <HeaderBox>
        <HeaderLogo src='/logo/HorizontalLogo(light).svg' />
        <ButtonBox>
          <HeaderButton onClick={toggleLoginModalOpen}>로그인</HeaderButton>
          <HeaderButton onClick={toggleSignupModalOpen}>회원가입</HeaderButton>
        </ButtonBox>
      </HeaderBox>
      {loginModalOpen && (
        <Portal>
          <LoginModal onClose={toggleLoginModalOpen} />
        </Portal>
      )}
      ;
      {signupModalOpen && (
        <Portal>
          <SignupModal onClose={toggleSignupModalOpen} />
        </Portal>
      )}
    </>
  );
};

export default Header;
