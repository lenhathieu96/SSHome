import {StyleSheet, Dimensions} from 'react-native';
import * as fontSize from '../../../../../Utils/FontSize';
import Color from '../../../../../Utils/Color';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    position: 'relative',
  },
  personal_card_container: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    zIndex: 1,
    elevation: 1,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  image_container: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: Color.secondary,
  },
  image: {
    flex: 0.8,
    width: null,
    height: null,
  },
  cta_container: {
    position: 'relative',
  },
  text: {
    textAlign: 'center',
    fontSize: fontSize.normal,
    fontFamily: 'MavenPro-Bold',
    fontWeight: 'bold',
  },
  icon_container: {
    width: 1.2 * fontSize.biggest,
    height: 1.2 * fontSize.biggest,
    borderRadius: 50,
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
    position: 'relative',
    width: 0.4 * width,
    height: 0.6 * width,
    backgroundColor: 'white',
    marginLeft: 5,
    padding: 5,
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
  nameContainer: {
    backgroundColor: Color.secondary,
    height: 0.4 * width,
    paddingTop: 5,
    alignItems: 'center',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  txtUserName: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
});

export default styles;
