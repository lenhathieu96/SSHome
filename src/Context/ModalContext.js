import React, {useState, createContext} from 'react';
import NotifyModal from '../Components/Modal/NotificationModal';
export const ModalContext = createContext();

const initialState = {
  isVisible: false,
  title: '',
  type: 'notify',
  status: 'danger',
};

export const ModalProvider = (props) => {
  const [modal, setModal] = useState(initialState);

  const notify = (text, status) => {
    setModal({
      isVisible: true,
      title: text,
      status: status ? 'success' : 'fail',
    });
    setTimeout(() => {
      setModal(initialState);
    }, 2000);
  };

  const alert = (text) => {
    setModal({isVisible: true, title: text, type: 'alert'});
  };

  const hideModal = () => {
    setModal({isVisible: false, title: '', type: 'notify'});
  };

  return (
    <ModalContext.Provider value={{notify, alert}}>
      {props.children}
      <NotifyModal
        isVisible={modal.isVisible}
        title={modal.title}
        type={modal.type}
        status={modal.status}
        hideModal={hideModal}
      />
    </ModalContext.Provider>
  );
};
