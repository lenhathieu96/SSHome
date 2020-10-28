import {StyleSheet} from 'react-native';
import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
const styles = StyleSheet.create({
  TextButton: {
    borderRadius: 50,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: fontSize.larger,
    color: 'white',
    fontFamily: 'MavenPro-Regular',
  },
});
export default styles;
