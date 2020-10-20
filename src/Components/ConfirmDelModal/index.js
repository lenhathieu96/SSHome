import React, {useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Modal} from 'react-native-paper';

import Text, {BoldText} from '../Text';
import TextButton from '../TextButton';

import styles from './styles/index.css';

export default function Confirm(props) {
  const {chosenTable, switchTable, toggleModal, modalVisible} = props;

  return (
    <Modal isVisible={modalVisible} onBackdropPress={() => toggleModal(false)}>
      <View style={styles.ModalContainer}>
        <BoldText style={styles.ModalText}>
          Đơn hàng này sẽ đưọc chuyển đến Bàn {chosenTable}
        </BoldText>
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
            onPress={() => switchTable(chosenTable)}
          />
        </View>
      </View>
    </Modal>
  );
}
