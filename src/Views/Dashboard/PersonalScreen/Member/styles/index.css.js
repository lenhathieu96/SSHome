import {StyleSheet, Dimensions} from 'react-native';

import Color from '../../../../../Utils/Color';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: 0.3 * width,
    height: 0.5 * width,
    backgroundColor: Color.background,
    marginHorizontal: 5,
    justifyContent: 'space-between',
  },
  nameContainer: {
    padding: 10,
    alignSelf: 'center',
    backgroundColor: Color.secondary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  phoneContainer: {
    padding: 10,
    alignItems: 'center',
    textAlign: 'center',
    flex: 0.3,
    backgroundColor: Color.secondary,
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default styles;
