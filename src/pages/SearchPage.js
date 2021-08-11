import axios from 'axios';
import { useEffect } from 'react';
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

const PlayBox = styled.div`
  height: 420px;
  width: 240px;
  margin-top: 32px;
  background-color: blue;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const JudgeBox = styled.div`
  height: 28px;
  width: 213px;
  display: flex;
  align-items: center;
  background-color: green;
`;

const Judge = styled.div`
  height: 28px;
  width: 58px;
  display: flex;
  align-items: center;
`;

const JudgeImg = styled.img`
  height: 20px;
  width: 21.86px;
`;

const PlayImage = styled.img`
  height: 299px;
  width: 213px;
`;

const PlayTitle = styled.h4`
  font-size: 20px;
  margin: 0;
`;

const PlayDate = styled.p`
  font-size: 18px;
  font-weight: lighter;
  margin: 0;
`;

function SearchPage() {
  // query string 있으면 검색결과 렌더링
  // 없으면 검색 창을 렌더링
  const [searchCondition] = useRecoilState(searchConditionState);
  // const [searchResult, setSearchResult] = useState({});
  useEffect(() => {
    const callApi = async () => {
      try {
        const {
          data: {
            data: { searched_results: searchedResults },
          },
        } = await axios({
          method: 'get',
          url: `${process.env.REACT_APP_SERVER_ORIGIN}/api/search/play`,
          params: {
            query: '째',
          },
        });
        // eslint-disable-next-line no-console
        console.log(searchedResults);
        return 1;
      } catch (err) {
        return err;
      }
    };
    callApi();
  }, []);
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
        <PlayBox>
          <JudgeBox>
            <Judge>
              <JudgeImg src='/svg/star.svg' alt='평점' />
              4.5
            </Judge>
            <Judge>
              <JudgeImg src='/svg/heart.svg' alt='찜 갯수' />
              99
            </Judge>
          </JudgeBox>
          <PlayImage />
          <PlayTitle>특별한 저녁식사</PlayTitle>
          <PlayDate>9999.99.99~9999.99.99</PlayDate>
        </PlayBox>
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
