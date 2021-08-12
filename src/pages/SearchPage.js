import axios from 'axios';
import { useState, useEffect } from 'react';
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
`;

const SearchTerm = styled.p`
  width: 237px;
  height: 40px;
  font-size: 17px;
  font-weight: normal;
  margin-top: 27px;
  margin-bottom: 0;
  margin-left: 51px;
`;

const FirstPlaysBox = styled(PlaysBox)`
  margin-top: 27px;
`;

const PlayBoxNav = styled.div`
  width: 1182px;
  height: 25px;
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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-right: 74px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
`;

const Plays = styled.div`
  height: 420px;
  width: 240px;
  display: flex;
`;

const JudgeBox = styled.div`
  height: 28px;
  width: 240px;
  display: flex;
  align-items: center;
`;

const Judge = styled.div`
  height: 28px;
  width: 58px;
  margin-left: 14px;
  display: flex;
  align-items: center;
`;

const JudgeHeart = styled(Judge)`
  margin-left: 0;
`;

const JudgeImg = styled.img`
  height: 20px;
  width: 21.86px;
`;

const PlayImage = styled.img`
  height: 299px;
  width: 213px;
  border-radius: 6px;
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
  const [searchResult, setSearchResult] = useState({});
  const [loaded, setLoaded] = useState(true);
  useEffect(() => {
    const callApi = async () => {
      setLoaded(false);
      try {
        const {
          data: {
            data: { searched_results: searchedResults },
          },
        } = await axios({
          method: 'get',
          url: `${process.env.REACT_APP_SERVER_ORIGIN}/api/search/play`,
          params: {
            query: `${searchCondition.searchTerm}`,
            location: `${searchCondition.option}`,
          },
        });
        // eslint-disable-next-line no-console
        console.log(searchedResults);
        return setSearchResult(searchedResults);
      } catch (err) {
        return err;
      }
    };
    callApi();
    setLoaded(true);
  }, []);
  // eslint-disable-next-line no-console
  console.log(searchResult);
  const {
    ongoing_plays: ongoingPlays,
    tobe_plays: tobePlays,
    closed_plays: closedPlays,
  } = searchResult;

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SearchTerm>
        {searchCondition.SearchTerm}에 대한 검색 결과 입니다
      </SearchTerm>
      <FirstPlaysBox>
        <PlayBoxNav>
          <BoxTitle>진행중인 공연</BoxTitle>
          <ShowMoreBtn
            to={`/search/ongoing?query=${searchCondition.searchTerm}`}
          >
            더보기
          </ShowMoreBtn>
        </PlayBoxNav>
        <Plays>
          {ongoingPlays &&
            ongoingPlays.map(play => {
              const {
                id,
                poster,
                title,
                likes,
                star_avg: starAvg,
                start_date: startDate,
                end_data: endDate,
              } = play;
              return (
                <PlayBox key={id}>
                  <JudgeBox>
                    <Judge>
                      <JudgeImg src='/svg/star.svg' alt='평점' />
                      {starAvg}
                    </Judge>
                    <JudgeHeart>
                      <JudgeImg src='/svg/heart.svg' alt='찜 갯수' />
                      {likes}
                    </JudgeHeart>
                  </JudgeBox>
                  <PlayImage src={poster} />
                  <PlayTitle>{title}</PlayTitle>
                  <PlayDate>{`${startDate}~${endDate || ''}`}</PlayDate>
                </PlayBox>
              );
            })}
          <PlayBox>
            <JudgeBox>
              <Judge>
                <JudgeImg src='/svg/star.svg' alt='평점' />
                4.5
              </Judge>
              <JudgeHeart>
                <JudgeImg src='/svg/heart.svg' alt='찜 갯수' />
                99
              </JudgeHeart>
            </JudgeBox>
            <PlayImage />
            <PlayTitle>특별한 저녁식사</PlayTitle>
            <PlayDate>9999.99.99~9999.99.99</PlayDate>
          </PlayBox>
        </Plays>
      </FirstPlaysBox>
      <PlaysBox>
        <PlayBoxNav>
          <BoxTitle>상영 예정인 공연</BoxTitle>
          <ShowMoreBtn to={`/search/tobe?query=${searchCondition.searchTerm}`}>
            더보기
          </ShowMoreBtn>
        </PlayBoxNav>
        {tobePlays &&
          tobePlays.map(play => {
            const {
              id,
              poster,
              title,
              likes,
              star_avg: starAvg,
              start_date: startDate,
              end_data: endDate,
            } = play;
            return (
              <PlayBox key={id}>
                <JudgeBox>
                  <Judge>
                    <JudgeImg src='/svg/star.svg' alt='평점' />
                    {starAvg}
                  </Judge>
                  <JudgeHeart>
                    <JudgeImg src='/svg/heart.svg' alt='찜 갯수' />
                    {likes}
                  </JudgeHeart>
                </JudgeBox>
                <PlayImage src={poster} />
                <PlayTitle>{title}</PlayTitle>
                <PlayDate>{`${startDate}~${endDate || ''}`}</PlayDate>
              </PlayBox>
            );
          })}
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
        {closedPlays &&
          closedPlays.map(play => {
            const {
              id,
              poster,
              title,
              likes,
              star_avg: starAvg,
              start_date: startDate,
              end_data: endDate,
            } = play;
            return (
              <PlayBox key={id}>
                <JudgeBox>
                  <Judge>
                    <JudgeImg src='/svg/star.svg' alt='평점' />
                    {starAvg}
                  </Judge>
                  <JudgeHeart>
                    <JudgeImg src='/svg/heart.svg' alt='찜 갯수' />
                    {likes}
                  </JudgeHeart>
                </JudgeBox>
                <PlayImage src={poster} />
                <PlayTitle>{title}</PlayTitle>
                <PlayDate>{`${startDate}~${endDate || ''}`}</PlayDate>
              </PlayBox>
            );
          })}
      </PlaysBox>
    </>
  );
}

export default SearchPage;
