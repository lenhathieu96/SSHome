import {StyleSheet} from 'react-native';
import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';
const styles = StyleSheet.create({
  //info
  infoContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherContainer: {
    flex: 0.3,
    alignItems: 'center',
  },
  txtWeatherContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  txtWeather: {
    fontSize: fontSize.larger,
    marginBottom: 3,
  },
  //Body
  bodyContainer: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 5,
    backgroundColor: Color.background,
  },
  roomlist: {
    flexGrow: 1,
    alignSelf: 'center',
  },
  listTitle: {
    marginVertical: 10,
    color: Color.primary,
    fontSize: fontSize.larger,
    alignSelf: 'center',
  },
  footerContainer: {
    backgroundColor: Color.background,
    flexDirection: 'row',
    height: 72,
    justifyContent: 'space-between',
  },
  btnMic: {
    flex: 0.4,
    backgroundColor: Color.background,
  },
  btnAddRoom: {
    flex: 0.6,
    margin: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

export default styles;