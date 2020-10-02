import {StyleSheet} from 'react-native';
import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  weatherContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtWeatherContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  txtWeather: {
    fontSize: fontSize.larger,
    marginBottom: 3,
  },
  bodyContainer: {
    flexGrow: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 5,
    backgroundColor: Color.background,
  },
  roomlist: {
    alignSelf: 'center',
    flex: 1,
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
    flex: 0.1,
    justifyContent: 'space-between',
  },
  btnMic: {
    flex: 0.3,
  },
  btnAddRoom: {
    flex: 0.6,
    margin: 0,
    borderTopRightRadius: 0,
  },
});

export default styles;
