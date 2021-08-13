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

const StaffBox = styled.div`
  width: 1150px;
  height: 276px;
  margin: 0 auto;
  font-weight: bold;
  .staffHeader {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      font-size: 36px;
    }
  }
  .staffHeader::before,
  .staffHeader::after {
    content: '';
    background: #529acc;
    width: 150px;
    height: 5px;
    font-size: 0px;
    line-height: 0px;
    margin: 0 19px;
  }
  .staffList {
    width: 1015px;
    height: 193px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    /* 오버플로우에 따른 슬라이드 구현하기 */
    overflow-x: scroll;
    p {
      text-align: center;
    }
  }
  .staffItem {
    margin: 0 67px;
    img {
      width: 120px;
      height: 120px;
      border-radius: 100%;
      background: #f2f2f2;
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
  const troupeId = 1;

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
    return <h1>loading...</h1>;
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
      <StaffBox>
        <div className='staffHeader'>
          <p>극단 구성원</p>
        </div>
        {/* <p></p> */}
        <div className='staffList'>
          {troupe.team.map(team => (
            <div className='staffItem' key={team.name}>
              {/* <img src={team.photo} alt='인물 이미지' /> */}
              <img src='/svg/people_default.svg' alt='인물 이미지' />
              <p>{team.name}</p>
            </div>
          ))}
        </div>
      </StaffBox>
    </>
  );
};

export default TroupePage;
