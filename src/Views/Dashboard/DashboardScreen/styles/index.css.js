import {StyleSheet} from 'react-native';
import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';
const styles = StyleSheet.create({
  infoContainer: {
    flex: 0.3,
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
  listContainer: {
    flexGrow: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 5,
    backgroundColor: Color.background,
  },
  roomlist: {
    alignSelf: 'center',
  },
  listTitle: {
    marginVertical: 10,
    color: Color.primary,
    fontSize: fontSize.larger,
    alignSelf: 'center',
  },
});

export default styles;
