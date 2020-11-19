import React, {useEffect} from 'react';
import {View, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

import Color from '../../../Utils/Color';
import styles from './styles/index.css';

export default function PlaceHolderLine(props) {
  const translateX = new Animated.Value(0);

  useEffect(() => {
    slideAnimation();
  });

  const slideAnimation = () => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: style ? (style.height ? style.height : 50) : 50,
        duration: 550,
        useNativeDriver: true,
      }),
    ).start();
  };
  const {style} = props;
  return (
    <View style={[styles.root, style]}>
      <Animated.View style={[styles.sliceElement, {transform: [{translateX}]}]}>
        <LinearGradient
          colors={[Color.background, '#d8d8d8']}
          style={styles.linearElement}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
        />
      </Animated.View>
    </View>
  );
}

PlaceHolderLine.propTypes = {
  style: PropTypes.object,
};
