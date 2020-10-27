import {StyleSheet, Dimensions} from 'react-native';
import * as fontSize from '../../../../../Utils/FontSize';
import Color from '../../../../../Utils/Color';

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  Header: {
    backgroundColor: Color.background,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Body: {
    backgroundColor: 'white',
    padding: 10,
    height: 0.8 * height,
  },
  BSEmptyTables__Title: {
    fontSize: fontSize.huge,
    color: Color.primary,
  },
  BSEmptyTables__itemContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Color.unactive,
  },
  BSEmptyTables__itemTitle: {
    fontSize: fontSize.larger,
  },
  lines: {
    width: 60,
    height: 5,
    borderRadius: 50,
    backgroundColor: 'white',
  },
});

export default styles;
