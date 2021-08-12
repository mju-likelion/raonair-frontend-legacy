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
  margin: 29px 0 10px 53px;
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
  margin-right: 30px;
`;

const PlayBox = styled(NavLink)`
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
  margin-right: 5px;
`;

const PlayImage = styled.img`
  height: 299px;
  width: 213px;
  border-radius: 6px;
`;

const PlayTitle = styled.h4`
  font-size: 20px;
  margin: 0 4px 5px 0;
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
        return setSearchResult(searchedResults);
      } catch (err) {
        return err;
      }
    };
    callApi();
    setLoaded(true);
  }, []);

  const {
    ongoing_plays: ongoingPlays,
    tobe_plays: tobePlays,
    closed_plays: closedPlays,
  } = searchResult;

  const data = [
    {
      param: 'ongoing',
      query: `${searchCondition.searchTerm}`,
      categoryTitle: '진행중인 공연',
      playData: ongoingPlays,
    },
    {
      param: 'tobe',
      query: `${searchCondition.searchTerm}`,
      categoryTitle: '상영 예정인 공연',
      playData: tobePlays,
    },
    {
      param: 'closed',
      query: `${searchCondition.searchTerm}`,
      categoryTitle: '종료된 공연',
      playData: closedPlays,
    },
  ];

  if (!loaded) {
    return <div>Loading...</div>;
  }
  /*eslint-disable*/
  return (
    <>
      <SearchTerm>
        {searchCondition.searchTerm}에 대한 검색 결과 입니다
      </SearchTerm>
      {searchCondition &&
        data.map(({ param, query, categoryTitle, playData }) => (
          <PlaysBox key={param}>
            <>
              <PlayBoxNav>
                <BoxTitle>{categoryTitle}</BoxTitle>
                <ShowMoreBtn to={`/search/${param}?query=${query}`}>
                  더보기
                </ShowMoreBtn>
              </PlayBoxNav>
              <Plays>
                {playData &&
                playData.map(play => {
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
                      <PlayBox key={id} to={`/play/${id}`}>
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
                        <PlayTitle>
                          {title}
                        </PlayTitle>
                        <PlayDate>
                          {`${startDate} ~ ${endDate || ''}`}
                        </PlayDate>
                      </PlayBox>
                  );
                })}
              </Plays>
            </>
          </PlaysBox>
        ))}
    </>
  );
}

export default SearchPage;
