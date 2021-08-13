import axios from 'axios';
import {useEffect, useState} from 'react';
import styled from 'styled-components';

import PlayComponent, {PlayBox} from '../components/PlayComponent';

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

/* eslint-disable */
const SearchResultPage = () => {
  const [reqCondition, setReqCondition] = useState({
    query: '째',
    start: 1,
    limit: 20,
    type: 'on-going',
    url: `${process.env.REACT_APP_SERVER_ORIGIN}/api/search/play/on-going`
  });
  const [searchedData, setSearchedData] = useState([]);
  useEffect(() => {
    if(!reqCondition.url) return;
    axios({
      method: 'get',
      url: `${reqCondition.url}`,
      params: {
        query: `${reqCondition.query}`,
        start: reqCondition.start,
        limit: reqCondition.limit,
      }
    })
      .then(({data: { data: { search_results: searchResults }, links: {next: nextUrl} }}) => {
        const {start, limit} = reqCondition;
        // setReqCondition({...reqCondition, start: start + limit, url: `${process.env.REACT_APP_SERVER_ORIGIN+nextUrl}`});
        setReqCondition({...reqCondition, start: start + limit, url: ''});
        setSearchedData(searchResults);
      })
      .catch(err => {
        return err;
      })
  })
  // const p = [{
  //   id: 40,
  //   poster: '#',
  //   title: 'a',
  //   likes: 30,
  //   start_ang: 4.5,
  //   start_date: '9999.99.99',
  //   end_date: '9999.99.99'
  // }]
  // for(let i = 1, id = 41; i <= 40; i++) {
  //   p.push({...p[0], id});
  //   id++;
  // }
  return (
    <MainBox>
      {searchedData && searchedData.map(data => (
        <SearchResultPlayBox key={data.id} to={`/play/${data.id}`}>
          <PlayComponent play={data}/>
        </SearchResultPlayBox>
      ))}
      {/*{searchedData && p.map(data => (*/}
      {/*  <SearchResultPlayBox key={data.id} to='#'>*/}
      {/*    <PlayComponent play={data} />*/}
      {/*  </SearchResultPlayBox>*/}
      {/*))}*/}
    </MainBox>
  );
};

export default SearchResultPage;
