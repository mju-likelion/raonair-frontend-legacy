import axios from 'axios';
import {useEffect, useState} from 'react';

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
        setReqCondition({...reqCondition, start: start + limit, url: `${process.env.REACT_APP_SERVER_ORIGIN+nextUrl}`});
        setSearchedData(searchResults);
      })
      .catch(err => {
        return err;
      })
  })
  return <div>a</div>
};

export default SearchResultPage;
