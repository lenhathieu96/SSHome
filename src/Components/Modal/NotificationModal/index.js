import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Text from '../../Text';
import TextButton from '../../../Components/TextButton';

import Color from '../../../Utils/Color';
import * as fontSize from '../../../Utils/FontSize';
import styles from './styles/index.css';

export default function NotifyModal(props) {
  const {title, isVisible, type, hideModal} = props;

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.ModalContainer}>
        <Icon
          name="exclamation-circle"
          color={Color.red}
          size={1.5 * fontSize.biggest}
          style={styles.icon}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{textAlign: 'center'}}> {title} </Text>
        </View>

        {type === 'alert' ? (
          <TextButton
            text="Đã rõ"
            onPress={() => hideModal()}
            style={styles.btn}
          />
        ) : null}
      </View>
    </Modal>
  );
}

NotifyModal.propTypes = {
  title: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
};
