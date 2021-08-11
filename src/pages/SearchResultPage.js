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

const BoxTitle = styled.h4`
  font-size: 20px;
  font-weight: normal;
`;

const SearchResultPage = () => {
  return (
    <>
      <FirstPlaysBox>
        <BoxTitle>진행중인 공연</BoxTitle>
      </FirstPlaysBox>
      <PlaysBox>
        <BoxTitle>상영 예정인 공연</BoxTitle>
      </PlaysBox>
      <PlaysBox>
        <BoxTitle>종료된 공연</BoxTitle>
      </PlaysBox>
    </>
  );
};

export default SearchResultPage;
