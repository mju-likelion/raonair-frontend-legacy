import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

import { searchTargetState } from '../globalState/search';

const Background = styled.div`
  height: 100vh;
  width: 100%;
  background: url(${`${process.env.PUBLIC_URL}/mainPageBackground.png`})
    no-repeat;
  background-size: 100% 658px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeadLine = styled.h2`
  color: white;
  margin-top: 87px;
`;

const SearchTargetBox = styled.div`
  width: 224px;
  height: 48px;
  margin-top: 12px;
  background: #e5e5e5;
  border-radius: 48px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const SearchTarget = styled.p`
  width: 34px;
  height: 20px;
  margin-left: 2px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 20px;
  /* identical to box height, or 111% */
  text-align: center;

  /* Font default color */
  color: #222222;
`;

const HighlightBox = styled.div`
  width: 106px;
  height: 36px;
  background: #e5e5e5;
  border-radius: 36px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: grab;
  }
`;

const HighlightBoxPlay = styled(HighlightBox)`
  ${({ highlight }) =>
    highlight === 'play' &&
    css`
      background-color: white;
    `}
`;

const HighlightBoxTroupe = styled(HighlightBox)`
  ${({ highlight }) =>
    highlight === 'troupe' &&
    css`
      background-color: white;
    `};
`;

const OptionBox = styled.div`
  width: 900px;
  height: 110px;
  margin-top: 48px;
  background-color: white;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  border-radius: 36px;
  display: flex;
  justify-content: space-evenly;
`;

const SearchOption = styled.div`
  width: 378px;
  height: 58px;
`;

const OptionTitle = styled.h4`
  margin-top: 27px;
  margin-bottom: 14px;
  font-weight: normal;
`;

const OptionInput = styled.input`
  width: 378px;
  height: 24px;
  border: 0;
  font-size: 20px;
  margin-left: -3px;
`;

const OptionSelect = styled.select`
  width: 378px;
  height: 24px;
  border: 0;
  color: gray;
  font-size: 20px;
`;

const VerticalLine = styled.div`
  align-self: center;
  width: 1px;
  height: 90px;
  background-color: lightgray;
`;

const SearchComponent = () => {
  const [selectedTarget, setSelectedTarget] = useState('play');
  const [searchOptions, setSearchOptions] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [searchTarget, setSearchTarget] = useRecoilState(searchTargetState);
  const [searchCondition, setSearchCondition] = useState({
    searchTerm: '',
    location: '',
    type: '',
  });
  const [optionQuery, setOptionQuery] = useState('');

  useEffect(() => {
    const getSearchOptions = async () => {
      try {
        const {
          data: {
            data: { play_options: playOptions },
          },
        } = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_SERVER_ORIGIN}/api/search/play-options`,
        });
        return setSearchOptions(playOptions);
      } catch (err) {
        return err;
      }
    };
    getSearchOptions();
  }, []);

  const handleClick = useCallback(
    ({
      nativeEvent: {
        target: { innerText },
      },
    }) => {
      const target = innerText === '연극' ? 'play' : 'troupe';
      setSearchTarget(target);
      setSelectedTarget(target);
    },
    [selectedTarget, searchTarget],
  );

  const handleChange = useCallback(
    ({ target: { value, name } }) => {
      if(name === 'location') {
        setSearchCondition({...searchCondition, type: '', [name]: value});
      }
      else if(name === 'type') {
        setSearchCondition({...searchCondition, location: '', [name]: value})
      }
      else{
        setSearchCondition({ ...searchCondition, [name]: value });
      }
    },
    [searchCondition],
  );

  const handleKeyPress = ({ key }) => {
    if (key === 'Enter') {
      const a = searchCondition.location ? `location=${searchCondition.location}` : `type=${searchCondition.type}`;
      setOptionQuery(a);
      setRedirect(true);
    }
  };

  const handleFocus = e => {
    e.target.value = '';
  };

  return (
    <>
      <Background onKeyPress={handleKeyPress}>
        <HeadLine>
          라온에어에 오신걸 환영합니다. 원하시는 연극 또는 극단을 검색해 주세요.
        </HeadLine>
        <SearchTargetBox>
          <HighlightBoxPlay highlight={selectedTarget}>
            <SearchTarget onClick={handleClick}>연극</SearchTarget>
          </HighlightBoxPlay>
          <HighlightBoxTroupe highlight={selectedTarget}>
            <SearchTarget onClick={handleClick}>극단</SearchTarget>
          </HighlightBoxTroupe>
        </SearchTargetBox>
        {redirect && (
          <Redirect
            to={`/search?query=${searchCondition.searchTerm}&${optionQuery}`}
          />
        )}
        <OptionBox>
          {selectedTarget === 'play' ? (
            <SearchOption>
              <OptionTitle>제목</OptionTitle>
              <OptionInput
                type='text'
                name='searchTerm'
                placeholder='어떤 제목인가요?'
                onChange={handleChange}
                onFocus={handleFocus}
              />
            </SearchOption>
          ) : (
            <SearchOption>
              <OptionTitle>이름</OptionTitle>
              <OptionInput
                type='text'
                name='searchTerm'
                placeholder='극단 이름을 입력해 주세요'
                onChange={handleChange}
                onFocus={handleFocus}
              />
            </SearchOption>
          )}
          <VerticalLine />
          {selectedTarget === 'play' ? (
            <SearchOption onChange={handleChange}>
              <OptionTitle>지역</OptionTitle>
              <OptionSelect name='location'>
                <option value=''>지역을 선택해 주세요</option>
                {searchOptions.map(({ key, value }) => (
                  <option value={key} key={key}>
                    {value}
                  </option>
                ))}
              </OptionSelect>
            </SearchOption>
          ) : (
            <SearchOption onChange={handleChange}>
              <OptionTitle>타입</OptionTitle>
              <OptionSelect name='type'>
                <option value=''>극단 타입을 선택해 주세요</option>
                <option value='normal'>일반 극단</option>
                <option value='student'>학생 극단</option>
              </OptionSelect>
            </SearchOption>
          )}
        </OptionBox>
      </Background>
    </>
  );
};

export default SearchComponent;
