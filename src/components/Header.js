import { useState } from 'react';
import styled from 'styled-components';

import LoginModal from './modal/LoginModal';
import Portal from './modal/Portal';

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

  const toggleLoginModalOpen = () => {
    setLoginModalOpen(!loginModalOpen);
  };

  return (
    <>
      <HeaderBox>
        <HeaderLogo src='/logo/HorizontalLogo(light).svg' />
        <ButtonBox>
          <HeaderButton onClick={toggleLoginModalOpen}>로그인</HeaderButton>
          <HeaderButton>회원가입</HeaderButton>
        </ButtonBox>
      </HeaderBox>
      {loginModalOpen && (
        <Portal>
          <LoginModal onClose={toggleLoginModalOpen} />
        </Portal>
      )}
    </>
  );
};

export default Header;
