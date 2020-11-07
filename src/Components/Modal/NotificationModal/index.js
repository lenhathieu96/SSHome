import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Text from '../../Text';
import TextButton from '../../../Components/TextButton';

import Color from '../../../Utils/Color';
import * as fontSize from '../../../Utils/FontSize';
import styles from './styles/index.css';

export default function NotifyModal(props) {
  const {title, isVisible, type, status, hideModal} = props;
  const {width} = Dimensions.get('window');

  return (
    <Modal isVisible={isVisible}>
      <View
        style={[
          styles.ModalContainer,
          {height: type === 'alert' ? 0.45 * width : 0.2 * width},
        ]}>
        <View style={styles.icon}>
          <Icon
            name={
              status === 'success'
                ? 'check-circle'
                : status === 'fail'
                ? 'times-circle'
                : 'exclamation-circle'
            }
            color={
              status === 'success'
                ? Color.green
                : status === 'fail'
                ? Color.red
                : Color.blue
            }
            size={1.5 * fontSize.biggest}
          />
        </View>
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
  type: PropTypes.string,
  status: PropTypes.string,
  hideModal: PropTypes.func,
};
