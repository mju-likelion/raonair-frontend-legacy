import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const TroupeBox = styled(NavLink)`
  height: 180px;
  width: 284px;
  margin-top: 20px;
  margin-right: 40px;
  //background-color: red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
`;

const TroupeImg = styled.img`
  height: 110px;
  width: 190px;
  border-radius: 6px;
`;

const TroupeTitle = styled.h4`
  font-weight: normal;
  font-size: 20px;
  margin-top: 13px;
  margin-bottom: 0;
`;

const TroupeComponent = ({troupe}) => {
  const {id, name, logo} = troupe;
  return (
    <TroupeBox to={`/troupe/${id}`}>
      <TroupeImg src={logo}/>
      <TroupeTitle>{name}</TroupeTitle>
    </TroupeBox>
  );
}

TroupeComponent.propTypes = {
  troupe: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
};

export default TroupeComponent;