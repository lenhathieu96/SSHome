import React, {useState, createContext} from 'react';
import NotifyModal from '../Components/Modal/NotificationModal';
export const ModalContext = createContext();

const initialState = {
  isVisible: false,
  title: '',
};

export const ModalProvider = (props) => {
  const [modal, setModal] = useState(initialState);

  const notify = (text) => {
    setModal({isVisible: true, title: text});
    setTimeout(() => {
      setModal({isVisible: false, title: ''});
    }, 1000);
  };

  return (
    <ModalContext.Provider value={{notify}}>
      {props.children}
      <NotifyModal isVisible={modal.isVisible} title={modal.title} />
    </ModalContext.Provider>
  );
};
