import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const PlayBox = styled(NavLink)`
  height: 420px;
  width: 240px;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-right: 37px;
  margin-left: 37px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
`;

const JudgeBox = styled.div`
  height: 28px;
  width: 240px;
  display: flex;
  align-items: center;
`;

const Judge = styled.div`
  height: 28px;
  width: 58px;
  margin-left: 14px;
  display: flex;
  align-items: center;
`;

const JudgeHeart = styled(Judge)`
  margin-left: 0;
`;

const JudgeImg = styled.img`
  height: 20px;
  width: 21.86px;
  margin-right: 5px;
`;

const PlayImage = styled.img`
  height: 299px;
  width: 213px;
  border-radius: 6px;
`;

const PlayTitle = styled.h4`
  font-size: 20px;
  margin: 0 4px 5px 0;
`;

const PlayDate = styled.p`
  font-size: 18px;
  font-weight: lighter;
  margin: 0;
`;

const PlayComponent = ({ play }) => {
  const {
    poster,
    title,
    likes,
    star_avg: starAvg,
    start_date: startDate,
    end_date: endDate,
  } = play;
  return (
    <>
      <JudgeBox>
        <Judge>
          <JudgeImg src='/svg/star.svg' alt='평점' />
          {starAvg}
        </Judge>
        <JudgeHeart>
          <JudgeImg src='/svg/heart.svg' alt='찜 갯수' />
          {likes}
        </JudgeHeart>
      </JudgeBox>
      <PlayImage src={poster} />
      <PlayTitle>{title}</PlayTitle>
      <PlayDate>{`${startDate} ~ ${endDate || ''}`}</PlayDate>
    </>
  );
};

PlayComponent.propTypes = {
  play: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
};

export {PlayBox};

export default PlayComponent;
