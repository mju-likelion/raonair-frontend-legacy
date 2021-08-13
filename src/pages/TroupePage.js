import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const TitleBox = styled.div`
  height: 509px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(to bottom, #49b0ff, #529acc33);
  p {
    color: #ffffee;
  }
  .titleButtons {
    margin-right: 50px;
    p {
      font-weight: bold;
      cursor: pointer;
    }
    p:hover {
      text-decoration: underline;
    }
  }

  .title {
    margin-top: 98px;
    display: flex;
    p {
      margin-left: 119px;
      font-size: 96px;
      font-weight: bold;
      text-decoration: underline;
      text-underline-position: under;
    }
  }
`;

// 로고에 따른 스타일 변경 필요
const TroupePage = id => {
  const [troupe, setTroupe] = useState(null);
  const [loading, setLoading] = useState(true);
  // 임시 극단 id값, 추후 props에서 받아온 값으로 수정해야함
  const troupeId = 2;

  // api 호출
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/troupe/${troupeId}`,
        );
        setTroupe(response.data.data);
      } catch (e) {
        // console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <h1>로딩중</h1>;
  }
  if (!troupe) {
    return null;
  }

  return (
    <>
      {/* api 호출 테스트 */}
      {/* {troupe && <textarea rows={10} value={JSON.stringify(troupe, null, 2)} />} */}

      <TitleBox>
        <div className='title'>
          <p>{troupe.troupe.name}</p>
        </div>
        <div className='titleButtons'>
          {/*
            클릭하면 정보 수정페이지로 넘어가게 현재 미구현
            찜하기 버튼은 이미지로 수정 필요
           */}
          <p>잘못된 정보가 있나요?</p>
          <p>찜하기버튼</p>
        </div>
      </TitleBox>
    </>
  );
};

export default TroupePage;
