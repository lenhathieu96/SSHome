import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View, Dimensions, Keyboard, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import IconButton from '../../IconButton';

import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
import styles from './styles/index.css';

const BottomSheet = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
    close() {
      setVisible(false);
      Keyboard.dismiss();
    },
  }));
  const {height} = Dimensions.get('window');
  const {swipeable, modalHeight, renderContent} = props;

  const [isVisble, setVisible] = useState(false);

  return (
    <Modal
      ref={ref}
      isVisible={isVisble}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection={swipeable ? ['down'] : []}
      onSwipeComplete={() => {
        setVisible(false);
        Keyboard.dismiss();
      }}
      style={styles.bsContainer}>
      <View
        style={[
          styles.container,
          {height: modalHeight ? modalHeight : 0.8 * height},
        ]}>
        <View style={styles.header}>
          <IconButton
            iconName={swipeable ? 'chevron-down' : 'x'}
            iconSize={1.2 * fontSize.biggest}
            iconColor={Color.secondary}
            style={{alignSelf: swipeable ? 'center' : 'flex-end'}}
            onPress={() => {
              setVisible(false);
              Keyboard.dismiss();
            }}
          />
        </View>
        <SafeAreaView style={styles.body}>{renderContent()}</SafeAreaView>
      </View>
    </Modal>
  );
});

export default BottomSheet;

BottomSheet.propTypes = {
  swipeable: PropTypes.bool.isRequired,
  modalHeight: PropTypes.number,
  renderContent: PropTypes.func,
};
