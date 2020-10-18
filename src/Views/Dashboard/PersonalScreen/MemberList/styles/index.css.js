import {StyleSheet, Dimensions} from 'react-native';
import * as fontSize from '../../../../../Utils/FontSize';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    position: 'relative',
  },
  personal_card_container: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    zIndex: 10,
    elevation: 10,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  image_container: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'red',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  cta_container: {
    backgroundColor: 'blue',
    position: 'relative',
  },
  text: {
    textAlign: 'center',
    fontSize: fontSize.normal,
    fontFamily: 'MavenPro-Bold',
    fontWeight: 'bold',
  },
  icon_container: {
    width: fontSize.biggest,
    height: fontSize.biggest,
    borderRadius: 32,
    backgroundColor: '#3578E5',
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'white',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll_view: {
    flexDirection: 'row',
  },
  fake_card: {
    width: 0.4 * width,
    height: 0.6 * width,
    backgroundColor: '#dddddd',
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 16,
  },
  fake_card_ghost: {
    backgroundColor: 'white',
    marginLeft: 10,
    borderWidth: 0,
    borderRadius: 16,
    width: 0.4 * width,
    height: 0.6 * width,
  },
  column_spacer: {
    width: 10,
    height: 0.6 * width,
  },
});

export default styles;
