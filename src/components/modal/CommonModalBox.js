import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  border: 2px solid #49b0ff;
  border-radius: 12px;
  background-color: #f6fbff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseBox = styled.div`
  width: 440px;
  height: 9px;
  display: flex;
  flex-direction: row-reverse;
`;

const CloseSvg = styled.img`
  width: 15px;
  height: 15px;
  margin-top: 24px;
  margin-right: 33px;
`;

export const ModalTitle = styled.h4`
  font-weight: normal;
  margin-bottom: 0;
`;

export const CloseModalBox = ({ onClose }) => {
  return (
    <CloseBox onClick={onClose}>
      <CloseSvg src='/svg/close.svg' />
    </CloseBox>
  );
};

CloseModalBox.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export const GetModalTitle = ({ children }) => {
  return <ModalTitle>{children}</ModalTitle>;
};

GetModalTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ModalBox;
