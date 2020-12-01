import React from 'react';
import {View, TextInput} from 'react-native';
import Modal from 'react-native-modal';

import {BoldText} from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';

import styles from './styles/index.jcss';

export default function RecoveryModal(props) {
  const {isVisible, onConfirmRecovery, onCloseModal} = props;
  return (
    <Modal isVisible={isVisible} onBackdropPress={() => onCloseModal()}>
      <View style={styles.modalContainer}>
        <BoldText style={styles.modalTitle}>Lấy lại mật khẩu</BoldText>
        <TextInput
          placeholder="Nhập email bạn đã đăng ký"
          style={styles.input}
        />
        <View style={styles.btnContainer}>
          <TextButton
            text="Huỷ"
            style={styles.btn}
            onPress={() => onCloseModal()}
          />
          <TextButton
            text="Xác nhận"
            style={styles.btn}
            onPress={() => onConfirmRecovery()}
          />
        </View>
      </View>
    </Modal>
  );
}
