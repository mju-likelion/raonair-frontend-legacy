import axios from 'axios';
import PropTypes from 'prop-types';
import qs from 'qs';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import PlayComponent, {PlayBox} from '../components/PlayComponent';
import SearchComponent from '../components/SearchComponent';
import TroupeCompoennt from '../components/TroupeComponent';
import { searchTargetState } from '../globalState/search';

const PlaysBox = styled.div`
  height: 477px;
  width: 1182px;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
`;

const TroupeBox = styled(PlaysBox)`
  height: 284px;
  margin-bottom: 25px;
`;

const Troupes = styled.div`
  height: 259px;
  width: 240px;
  display: flex;
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

/* eslint-disable */
function SearchPage ({ location }) {
  // query string 있으면 검색결과 렌더링
  // 없으면 검색 창을 렌더링
  const [searchTarget] = useRecoilState(searchTargetState);
  const [searchResult, setSearchResult] = useState({});
  const [loaded, setLoaded] = useState(true);
  const searchCondition = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const reqUrl = `${process.env.REACT_APP_SERVER_ORIGIN}/api/search/${searchTarget.target}`
  const callApi = async () => {
    setLoaded(false);
    try {
      const {
        data: {
          data: { searched_results: searchedResults },
        },
      } = await axios({
        method: 'get',
        url: `${reqUrl}`,
        params: {
          query: `${searchCondition.query}`,
          ...(searchCondition.location
            ? { location: searchCondition.location }
            : {...(searchCondition.type) ? {type: searchCondition.type} : {}}),
        },
      });
      console.log(searchedResults);
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

  const {
    troupe_all: troupeAll,
    troupe_normal: troupeNormal,
    troupe_student: troupeStudent,
  } = searchResult;
  let totalTroupe = [];
  if(troupeNormal) {
    totalTroupe = troupeNormal.concat(troupeStudent);
  }
  const data = [
    {
      param: `${searchTarget.target === 'play' ? 'ongoing' : 'troupe/detail'}`,
      query: searchCondition.query,
      categoryTitle: `${searchTarget.target === 'play' ? '진행중인 공연' : '모든 극단'}`,
      playData: searchTarget.target === 'play' ? ongoingPlays : totalTroupe,
    },
    {
      param: `${searchTarget.target === 'play' ? 'tobe' : 'troupe/detail'}`,
      query: searchCondition.query,
      categoryTitle: `${searchTarget.target === 'play' ? '상영 예정인 공연' : '일반 극단'}`,
      playData: searchTarget.target === 'play' ? tobePlays : troupeNormal,
    },
    {
      param: `${searchTarget.target === 'play' ? 'closed' : 'troupe/detail'}`,
      query: searchCondition.query,
      categoryTitle: `${searchTarget.target === 'play' ? '종료된 공연' : '학생 극단'}`,
      playData: searchTarget.target ? closedPlays : troupeStudent,
    },
  ];


  if (!loaded) {
    return <div>Loading...</div>;
  }

  const a = [{
    id: 20,
    name: 'a',
    logo: '#',
  }, {
    id: 30,
    name: 'a',
    logo: '#',
  }];

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
          {searchCondition && searchTarget.target === 'play' &&
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
                        return (
                          <PlayBox key={play.id} to={`/play/${play.id}`}>
                            <PlayComponent play={play} />
                          </PlayBox>
                        );
                      })}
                  </Plays>
                </>
              </PlaysBox>
            ))}
            {searchCondition && searchTarget.target === 'troupe' &&
              data.map(({param, query, categoryTitle, playData}) => (
                <TroupeBox key={categoryTitle}>
                  <>
                    <PlayBoxNav>
                      <BoxTitle>
                        {categoryTitle}
                      </BoxTitle>
                      <ShowMoreBtn to={`/search/${param}?query=${query}`}>
                        더보기
                      </ShowMoreBtn>
                    </PlayBoxNav>
                    <Troupes>
                      {playData &&
                      playData.map((troupe) => <TroupeCompoennt key={troupe.id} troupe={troupe} />)}
                      {/*{playData && a.map((troupe) => <TroupeCompoennt key={troupe.id} troupe={troupe} />)}*/}
                    </Troupes>
                  </>
                </TroupeBox>
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
