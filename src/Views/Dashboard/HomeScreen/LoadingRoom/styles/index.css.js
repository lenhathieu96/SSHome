import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: 0.6 * height,
    width: 0.8 * width,
    alignSelf: 'center',
    borderRadius: 20,
  },
});

export default styles;
