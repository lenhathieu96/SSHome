import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Text from '../../Text';
import {View} from 'react-native';

import styles from './styles/index.css';

export default function NotifyModal(props) {
  const {title, isVisible} = props;

  return (
    <Modal isVisible={isVisible} animationIn="fadeIn" animationOut="fadeOut">
      <View style={styles.ModalContainer}>
        <Text style={styles.ModalText}>{title}</Text>
      </View>
    </Modal>
  );
}

NotifyModal.propTypes = {
  title: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
};
