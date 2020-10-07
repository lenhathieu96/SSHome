import {StyleSheet, Dimensions} from 'react-native';
import * as fontSize from '../../../../../Utils/FontSize';
import Color from '../../../../../Utils/Color';

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  Header: {
    padding: 10,
    backgroundColor: 'white',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    alignItems: 'center',
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
});

export default styles;
