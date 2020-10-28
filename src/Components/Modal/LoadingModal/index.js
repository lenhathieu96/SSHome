import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import Text from '../../Text';

import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';

import styles from './styles/index.css';

export default function LoadingModal(props) {
  const {isVisible, title} = props;
  return (
    <Modal isVisible={isVisible} animationIn="fadeIn" animationOut="fadeOut">
      <View style={styles.ModalContainer}>
        <ActivityIndicator
          shouldRasterizeIOS={true}
          size={fontSize.bigger}
          color={Color.primary}
        />
        <Text style={styles.ModalText}>
          {title ? title : 'Vui lòng đợi ...'}
        </Text>
      </View>
    </Modal>
  );
}

LoadingModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};
