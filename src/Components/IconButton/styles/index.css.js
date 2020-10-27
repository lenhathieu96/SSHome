import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    marginLeft: 7,
  },
  button: {
    justifyContent: 'center',
  },
});

export default styles;
