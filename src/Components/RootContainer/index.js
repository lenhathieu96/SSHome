import React from 'react';
import {View, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';

RootContainer.propTypes = {
  safeArea: PropTypes.bool.isRequired,
  style: PropTypes.object,
  children: PropTypes.node,
};

export default function RootContainer({
  safeArea = false,
  style,
  children,
  ...otherProps
}) {
  return safeArea ? (
    <SafeAreaView style={[{flex: 1}, style]} {...otherProps}>
      {children}
    </SafeAreaView>
  ) : (
    <View style={[{flex: 1}, style]} {...otherProps}>
      {children}
    </View>
  );
}
