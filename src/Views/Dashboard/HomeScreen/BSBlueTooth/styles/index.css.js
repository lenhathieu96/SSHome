import {StyleSheet, Dimensions} from 'react-native';
import * as fontSize from '../../../../../Utils/FontSize';
import Color from '../../../../../Utils/Color';

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  Header: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: 0.05 * height,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Color.unactive,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Body: {
    backgroundColor: 'white',
    height: 0.75 * height,
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
  },
  title: {
    fontSize: fontSize.larger,
    alignSelf: 'center',
    marginVertical: 10,
  },
  lines: {
    width: 60,
    height: 5,
    borderRadius: 50,
    backgroundColor: Color.primary,
  },
  listContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtInfo: {
    textAlign: 'center',
    color: Color.blue,
    marginVertical: 10,
  },
});

export default styles;
