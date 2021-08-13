import axios from 'axios';
import PropTypes from 'prop-types';
import qs from 'qs';
import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import styled from 'styled-components';

import PlayComponent, {PlayBox} from '../components/PlayComponent';
import TroupeComponent from '../components/TroupeComponent';
import {searchTargetState} from '../globalState/search';

const SearchResultPlayBox = styled(PlayBox)`
  margin-bottom: 20px;
`;

const MainBox = styled.div`
  width: 1256px;
  margin-top: 22px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
`;

const SearchResultPage = ({location, match}) => {
  const [searchTarget] = useRecoilState(searchTargetState);
  const searchCondition = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const p = searchTarget.target === 'play' ? match.params.type : 'detail';
  const [reqCondition, setReqCondition] = useState({
    query: searchCondition.query,
    start: 0,
    limit: 20,
    type: `${match.params.type}`,
    url: `${process.env.REACT_APP_SERVER_ORIGIN}/api/search/${searchTarget.target}/${p}`
  });
  const [searchedData, setSearchedData] = useState([]);
  useEffect(() => {
    if(reqCondition.url === `${process.env.REACT_APP_SERVER_ORIGIN}`) return;
    axios({
      method: 'get',
      url: `${reqCondition.url}`,
      params: {
        query: `${reqCondition.query}`,
        start: reqCondition.start,
        limit: reqCondition.limit,
        ...(searchTarget.target === 'troupe' ? {type: searchCondition.type} : {}),
      }
    })
      .then(({data: { data: { search_results: searchResults }, links: {next: nextUrl} }}) => {
        const {start, limit} = reqCondition;
        setReqCondition({...reqCondition, start: start + limit, url: `${process.env.REACT_APP_SERVER_ORIGIN+nextUrl}`});
        setSearchedData(searchResults);
      })
      .catch(err => {
        return err;
      })
  })
  return (
    <MainBox>
      {searchTarget.target === 'play' && searchedData && searchedData.length && searchedData.map(data => {
        return (
          <SearchResultPlayBox key={data.id} to={`/play/${data.id}`}>
            <PlayComponent play={data}/>
          </SearchResultPlayBox>
        );
      })}
      {searchTarget.target === 'troupe' && searchedData && searchedData.length && searchedData.map(data => {
        return <TroupeComponent troupe={data} />
      })}
    </MainBox>
  );
};

SearchResultPage.propTypes = {
  location: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.objectOf(PropTypes.booleanValue),
    ]),
  ).isRequired,
  match:  PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.objectOf(PropTypes.string),
    ]),
  ).isRequired,
};

export default SearchResultPage;
