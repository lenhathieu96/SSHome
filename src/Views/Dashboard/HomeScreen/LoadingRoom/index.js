import React, {useState, useEffect} from 'react';
import {Animated} from 'react-native';
import styles from './styles/index.css';

export default function LoadingRoom() {
  const [opacity, setOpactiy] = useState(new Animated.Value(1));

  useEffect(() => {
    fadeEffect();
  });

  const fadeEffect = () => {
    Animated.timing(opacity, {
      toValue: 0.5,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start(() => fadeEffect());
    });
  };

  return <Animated.View style={[styles.container, {opacity}]} />;
}
