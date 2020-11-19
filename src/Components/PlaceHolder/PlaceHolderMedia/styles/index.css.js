import {StyleSheet} from 'react-native';
import Color from '../../../../Utils/Color';
const styles = StyleSheet.create({
  root: {
    backgroundColor: Color.background,
    borderRadius: 20,
    width: 50,
    height: 50,
    overflow: 'hidden',
  },
  sliceElement: {
    width: '55%',
    height: '100%',
  },
  linearElement: {
    flex: 1,
    opacity: 0.5,
  },
});

export default styles;
