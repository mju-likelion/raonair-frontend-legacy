import styled from 'styled-components';

const HeaderBox = styled.div`
  height: 64px;
  width: 100%;
  background-color: gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLogo = styled.img`
  height: 34px;
  width: 102.34px;
  margin-left: 48px;
`;

const ButtonBox = styled.div`
  height: 36px;
  width: 154px;
  margin-right: 48px;
  background-color: red;
`;

const Header = () => {
  return (
    <>
      <HeaderBox>
        <HeaderLogo src='/logo/HorizontalLogo(light).svg' />
        <ButtonBox />
      </HeaderBox>
    </>
  );
};

export default Header;
