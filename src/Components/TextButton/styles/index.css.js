import {StyleSheet} from 'react-native';
import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
const styles = StyleSheet.create({
  TextButton: {
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    margin: 5,
  },
  text: {
    fontWeight: 'bold',
    fontSize: fontSize.larger,
    color: 'white',
    fontFamily: 'MavenPro-Regular',
  },
});
export default styles;
