import axios from 'axios';
import PropTypes from 'prop-types';
import qs from 'qs';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import PlayComponent from '../components/PlayComponent';
import SearchComponent from '../components/SearchComponent';
// import { searchTargetState } from '../globalState/search';

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

const Plays = styled.div`
  height: 420px;
  width: 240px;
  display: flex;
`;

function SearchPage({ location }) {
  // query string 있으면 검색결과 렌더링
  // 없으면 검색 창을 렌더링
  // const [searchTarget] = useRecoilState(searchTargetState);
  const [searchResult, setSearchResult] = useState({});
  const [loaded, setLoaded] = useState(true);
  const searchCondition = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
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
          query: `${searchCondition.query}`,
          ...(searchCondition.location
            ? { location: searchCondition.location }
            : {}),
        },
      });
      return setSearchResult(searchedResults);
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
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
      query: searchCondition.query,
      categoryTitle: '진행중인 공연',
      playData: ongoingPlays,
    },
    {
      param: 'tobe',
      query: searchCondition.query,
      categoryTitle: '상영 예정인 공연',
      playData: tobePlays,
    },
    {
      param: 'closed',
      query: searchCondition.query,
      categoryTitle: '종료된 공연',
      playData: closedPlays,
    },
  ];

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!searchCondition.query && <SearchComponent />}
      {searchCondition.query &&
      searchResult &&
      Object.keys(searchResult).length === 0 ? (
        <BoxTitle>검색 결과가 없습니다</BoxTitle>
        ) : (
          <>
          <SearchTerm>
            {searchCondition.query}에 대한 검색 결과 입니다
          </SearchTerm>
          {searchCondition &&
            data.map(({ param, query, categoryTitle, playData }) => (
              <PlaysBox key={categoryTitle}>
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
                        return <PlayComponent key={play.id} play={play} />;
                      })}
                  </Plays>
                </>
              </PlaysBox>
            ))}
          </>
        )}
    </>
  );
}

SearchPage.propTypes = {
  location: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.objectOf(PropTypes.booleanValue),
    ]),
  ).isRequired,
};

export default SearchPage;
