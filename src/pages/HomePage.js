import {useState, useCallback} from 'react';
import styled, {css} from 'styled-components';

const Background = styled.div`
  height: 100vh;
  width: 100%;
  background: url(${process.env.PUBLIC_URL + '/mainPageBackground.png'}) no-repeat;
  background-size: 100% 658px ;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeadLine = styled.h2`
  color: white;
  margin-top: 100px;
`;

const SearchTargetBox = styled.div`
  width: 224px;
  height: 48px;
  background: #E5E5E5;
  border-radius: 48px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const SearchTarget = styled.p`
  width: 34px;
  height: 20px;
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
  background: #E5E5E5;
  border-radius: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: grab;
  }
`;

const HighlightBoxPlay = styled(HighlightBox)`
    ${({highlight}) =>
    (highlight === '연극') && css`
            background-color: white;
        `}
`;

const HighlightBoxTroupe = styled(HighlightBox)`
    ${({highlight}) =>
    (highlight === '극단') && css`
            background-color: white;
        `};
`;

const HomePage = () => {
    const [selectedTarget, setSelectedTarget] = useState('연극');
    const handleClick = useCallback(({nativeEvent:{target:{innerText}}}) => {
        setSelectedTarget(innerText);
    }, [setSelectedTarget]);

    return (
        <>
            <Background>
                <HeadLine>라온에어에 오신걸 환영합니다.  원하시는 연극 또는 극단을 검색해 주세요.</HeadLine>
                <SearchTargetBox>
                    <HighlightBoxPlay highlight={selectedTarget}>
                        <SearchTarget onClick={handleClick}>연극</SearchTarget>
                    </HighlightBoxPlay>
                    <HighlightBoxTroupe highlight={selectedTarget}>
                        <SearchTarget onClick={handleClick}>극단</SearchTarget>
                    </HighlightBoxTroupe>
                </SearchTargetBox>
            </Background>
        </>
    );
}

export default HomePage;
