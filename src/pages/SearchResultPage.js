import styled from 'styled-components';

const PlaysBox = styled.div`
  height: 477px;
  width: 1182px;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
  background-color: red;
`;

const FirstPlaysBox = styled(PlaysBox)`
  margin-top: 81px;
`;

const SearchResultPage = () => {
  return (
    <>
      <FirstPlaysBox />
      <PlaysBox />
      <PlaysBox />
    </>
  );
};

export default SearchResultPage;
