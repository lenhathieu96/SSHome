import {StyleSheet} from 'react-native';
import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5,
  },
  headerTitle: {
    fontSize: fontSize.huge,
    color: Color.primary,
    flex: 0.6,
    alignItems: 'center',
    textAlign: 'center',
  },
  headerButton: {
    flex: 0.3,
    alignSelf: 'center',
  },
  //info
  infoContainer: {
    flex: 0.1,
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
