import {StyleSheet} from 'react-native';
import Color from '../../../../Utils/Color';
const styles = StyleSheet.create({
  root: {
    backgroundColor: Color.background,
    borderRadius: 20,
    width: 80,
    height: 10,
    overflow: 'hidden',
  },
  sliceElement: {
    width: '45%',
    height: '100%',
  },
  linearElement: {
    flex: 1,
    opacity: 0.5,
  },
});

export default styles;
