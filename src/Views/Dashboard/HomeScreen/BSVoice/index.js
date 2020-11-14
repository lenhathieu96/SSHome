import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {View, Dimensions} from 'react-native';

import Voice from '@react-native-community/voice';

import Text, {BoldText} from '../../../../Components/Text';
import BottomSheet from '../../../../Components/Modal/BottomSheet';

import Color from '../../../../Utils/Color';
import * as fontSize from '../../../../Utils/FontSize';
import styles from './styles/index.css';

const BSVoice = React.forwardRef((props, ref) => {
  const {height} = Dimensions.get('window');
  let stopListenTimeOut;
  let listeningInterval;
  const initDelay = 10000;
  const [messages, setMessages] = useState();
  const [isListening, setListening] = useState();
  const {} = props;

  useEffect(() => {
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    return () => {
      clearInterval(listeningInterval);
      clearTimeout(stopListenTimeOut);
      Voice.destroy().then(Voice.removeAllListeners());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startListening = () => {
    setMessages('');
    setListening(true);
    Voice.start('vi-VN');
    // listeningInterval = setInterval(() => Voice.start('vi-VN'), 2500);
    // stopListenTimeOut = setTimeout(() => stopListening(), 10000);
  };

  const stopListening = () => {
    Voice.stop()
      .then((res) => {
        console.log('stop listening');
        setListening(false);
        clearInterval(listeningInterval);
        clearTimeout(stopListenTimeOut);
      })
      .catch((e) => {
        console.log(e.error);
      });
  };

  const _onSpeechStart = () => {
    console.log('_onSpeechStart');
  };

  const _onSpeechEnd = () => {
    console.log('_onSpeechEnd');
  };

  const _onSpeechResults = (e) => {
    console.log('_onSpeechResults');
    setMessages(e.value[0]);
    stopListening();
  };

  return (
    <BottomSheet
      modalHeight={0.3 * height}
      swipeable={true}
      ref={ref}
      renderContent={() => (
        <View style={styles.Body}>
          <BoldText style={styles.title}>
            {isListening ? 'Đang Lắng Nghe' : ''}
          </BoldText>
          <Text>{messages}</Text>
        </View>
      )}
    />
  );
});

export default BSVoice;

BSVoice.propTypes = {};
