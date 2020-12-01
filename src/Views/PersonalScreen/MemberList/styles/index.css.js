import {StyleSheet, Dimensions} from 'react-native';
import Color from '../../../../Utils/Color';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 10,
    width: 0.3 * width,
    height: 0.4 * width,
    marginHorizontal: 5,
    alignItems: 'center',
    position: 'relative',
  },
  memberAvatar: {
    width: 0.25 * width,
    height: 0.25 * width,
    borderRadius: 50,
    backgroundColor: Color.background,
    overflow: 'hidden',
    padding: 10,
    borderWidth: 5,
    borderColor: Color.secondary,
  },
  memberName: {
    textAlign: 'center',
  },
  memberNameContainer: {
    width: 0.3 * width,
    padding: 5,
    marginTop: -15,
    alignItems: 'center',
    backgroundColor: Color.secondary,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 2,
  },
});

export default styles;
