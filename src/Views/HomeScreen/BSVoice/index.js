import React, {useEffect, useState} from 'react';

import {View, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';

import Voice from '@react-native-community/voice';

import Text, {BoldText} from '../../../Components/Text';
import BottomSheet from '../../../Components/Modal/BottomSheet';

import styles from './styles/index.css';

const BSVoice = React.forwardRef((props, ref) => {
  const {isListening, voiceControl, availableRooms} = props;
  const {height} = Dimensions.get('window');

  const [message, setMessage] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isListening) {
      startListening();
    }
  }, [isListening, availableRooms]);

  const startListening = () => {
    setMessage('');
    setTimeout(async () => await Voice.start('vi-VN'), 500);
  };

  const _onSpeechStart = () => {
    console.log('_onSpeechStart');
  };

  const _onSpeechEnd = () => {
    console.log('_onSpeechEnd');
    voiceControl(message, []);
  };

  const _onSpeechResults = (e) => {
    console.log('_onSpeechResults');
    setMessage(e.value[0]);
    voiceControl(e.value[0].toLowerCase(), availableRooms);
  };

  return (
    <BottomSheet
      modalHeight={0.3 * height}
      swipeable={true}
      ref={ref}
      renderContent={() => (
        <View style={styles.Body}>
          {message !== '' && !isListening ? (
            <View style={styles.voiceContainer}>
              <Text>Bạn vừa nói: </Text>
              <BoldText style={styles.title}>{message}</BoldText>
            </View>
          ) : (
            <View style={styles.listenContainer}>
              <BoldText style={styles.title}>Đang Lắng Nghe</BoldText>
              <LottieView
                source={require('../../../Assets/Images/Lottie/voiceLottie.json')}
                autoPlay
                loop
              />
            </View>
          )}
        </View>
      )}
    />
  );
});

export default BSVoice;

BSVoice.propTypes = {};
