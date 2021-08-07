import styled from 'styled-components';

const HeaderBox = styled.div`
  height: 64px;
  width: 100%;
  background-color: gray;
`;

const HeaderLogo = styled.img`
  height: 34px;
  width: 102.34px;
`;

const Header = () => {
  return (
    <>
      <HeaderBox>
        <HeaderLogo src='/logo/HorizontalLogo(light).svg' />
      </HeaderBox>
    </>
  );
};

export default Header;
