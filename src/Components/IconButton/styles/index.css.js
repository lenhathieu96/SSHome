import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    marginTop: 8,
    marginLeft: 8,
  },
  button: {
    justifyContent: 'center',
  },
});

export default styles;
