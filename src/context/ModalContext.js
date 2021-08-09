import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

const ModalContext = createContext({
  state: { clickedModal: false },
  action: {
    setClickedModal: () => {},
  },
});

const ModalProvider = ({ children }) => {
  const [clickedModal, setClickedModal] = useState(false);
  const value = {
    states: { clickedModal },
    actions: { setClickedModal },
  };
  // eslint-disable-next-line no-console
  console.log(children);
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

const { Consumer: ModalConsumer } = ModalContext;

ModalProvider.defaultProps = {
  children: null,
};

ModalProvider.propTypes = {
  children: PropTypes.element,
};

export { ModalProvider, ModalConsumer };

export default ModalContext;
