import {useContext} from 'react';
import {ModalContext} from '../Context/ModalContext';

export const useNotify = () => {
  const modal = useContext(ModalContext);
  if (!modal) {
    throw new Error('useModal must be used with ModalProvider');
  }
  return modal.notify;
};

export const useAlert = () => {
  const modal = useContext(ModalContext);
  if (!modal) {
    throw new Error('useModal must be used with ModalProvider');
  }
  return modal.alert;
};
