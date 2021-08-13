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
    img {
      float: right;
      cursor: pointer;
    }
    img:hover {
      background-image: url('/svg/like_on.svg');
    }
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
// 좋아요 기능 구현 필요
const TroupePage = () => {
  const [troupe, setTroupe] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [likeImg, setLikeImg] = useState('/svg/like_off.svg');
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
  }, []);

  if (loading) {
    return <h1>로딩중</h1>;
  }
  if (!troupe) {
    return null;
  }
  // 좋아요 여부 판단
  // if (troupe.context.like_check) {
  //   setLikeImg('/svg/like_on.svg');
  // } else {
  //   setLikeImg('/svg/like_off.svg');
  // }

  return (
    <>
      {/* api 호출 테스트 */}
      {/* {troupe && <textarea rows={10} value={JSON.stringify(troupe, null, 2)} />} */}

      <TitleBox>
        <div className='title'>
          <p>{troupe.troupe.name}</p>
        </div>
        <div className='titleButtons'>
          <p>잘못된 정보가 있나요?</p>
          <img src='/svg/like_off.svg' alt='좋아요버튼' />
        </div>
      </TitleBox>
    </>
  );
};

export default TroupePage;
