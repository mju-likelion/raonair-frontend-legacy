import ReactDOM from 'react-dom';

const ModalPortal = ({ children }) => {
  const ele = document.getElementById('modal');
  return ReactDOM.createPortal(<>{children}</>, ele);
};

export default ModalPortal;
