import React from 'react';
import {View, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles/index.css';

export default function RootContainer({
  safeArea = false,
  style,
  children,
  ...otherProps
}) {
  return safeArea ? (
    <SafeAreaView style={[styles.root, style]} {...otherProps}>
      {children}
    </SafeAreaView>
  ) : (
    <View style={[styles.root, style]} {...otherProps}>
      {children}
    </View>
  );
}

RootContainer.propTypes = {
  safeArea: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node,
};
