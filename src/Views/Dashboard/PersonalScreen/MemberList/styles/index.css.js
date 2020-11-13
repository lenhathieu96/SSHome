import {StyleSheet, Dimensions} from 'react-native';
import * as fontSize from '../../../../../Utils/FontSize';
import Color from '../../../../../Utils/Color';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    position: 'relative',
  },
  itemContainer: {
    borderRadius: 10,
    width: 0.3 * width,
    height: 0.4 * width,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  userImage: {
    width: 0.2 * width,
    height: 0.2 * width,
    borderRadius: 50,
    backgroundColor: Color.secondary,
  },
});

export default styles;
