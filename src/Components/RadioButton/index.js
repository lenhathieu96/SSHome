import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';

import Text from '../Text';

import styles from './styles/index.css';
import Color from '../../Utils/Color';

export default function RadioButton(props) {
  const {title, status, onPress, style} = props;

  return (
    <TouchableWithoutFeedback onPress={() => onPress()}>
      <View style={[styles.radioBtnContainer, style]}>
        <View style={styles.dotContainer}>
          <View
            style={[
              styles.dot,
              {
                backgroundColor:
                  status === 'checked' ? Color.primary : 'transparent',
              },
            ]}
          />
        </View>
        <Text>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

RadioButton.propTypes = {
  title: PropTypes.string,
  status: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
};
