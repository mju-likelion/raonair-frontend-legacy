import { NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { searchConditionState } from '../globalState/search';

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

const PlayBoxNav = styled.div`
  width: 1182px;
  height: 25px;
  background-color: gray;
  display: flex;
  justify-content: space-between;
`;

const BoxTitle = styled.h4`
  margin-top: 0;
  font-size: 20px;
  font-weight: normal;
`;

const ShowMoreBtn = styled(NavLink)`
  font-size: 20px;
  color: #49b0ff;
`;

function SearchPage() {
  // query string 있으면 검색결과 렌더링
  // 없으면 검색 창을 렌더링
  const [searchCondition] = useRecoilState(searchConditionState);
  // eslint-disable-next-line no-console
  console.log(searchCondition);
  return (
    <>
      <FirstPlaysBox>
        <PlayBoxNav>
          <BoxTitle>진행중인 공연</BoxTitle>
          <ShowMoreBtn
            to={`/search/ongoing?query=${searchCondition.searchTerm}`}
          >
            더보기
          </ShowMoreBtn>
        </PlayBoxNav>
      </FirstPlaysBox>
      <PlaysBox>
        <PlayBoxNav>
          <BoxTitle>상영 예정인 공연</BoxTitle>
          <ShowMoreBtn to={`/search/tobe?query=${searchCondition.searchTerm}`}>
            더보기
          </ShowMoreBtn>
        </PlayBoxNav>
      </PlaysBox>
      <PlaysBox>
        <PlayBoxNav>
          <BoxTitle>종료된 공연</BoxTitle>
          <ShowMoreBtn
            to={`/search/closed?query=${searchCondition.searchTerm}`}
          >
            더보기
          </ShowMoreBtn>
        </PlayBoxNav>
      </PlaysBox>
    </>
  );
}

export default SearchPage;
