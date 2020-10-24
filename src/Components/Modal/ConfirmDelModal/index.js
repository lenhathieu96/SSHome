import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';

import PropTypes from 'prop-types';

import Text, {BoldText} from '../../Text';
import TextButton from '../../TextButton';

import styles from './styles/index.css';

export default function ConfirmDelModa(props) {
  const {title, toggleModal, isVisible, onAccept} = props;

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.ModalContainer}>
        <BoldText style={styles.ModalText}>{title}</BoldText>
        <Text style={styles.ModalText}>Bạn có chắc chắn muốn xoá ?</Text>
        <View style={styles.ButtonWrapper}>
          <TextButton
            text="Không"
            style={styles.btnDeny}
            textStyle={styles.btnDeny__Text}
            onPress={() => {
              toggleModal(false);
            }}
          />
          <TextButton
            text="Có"
            style={styles.btnAccept}
            textStyle={styles.btnAccept__Text}
            onPress={() => onAccept()}
          />
        </View>
      </View>
    </Modal>
  );
}

ConfirmDelModa.propTypes = {
  title: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
};
