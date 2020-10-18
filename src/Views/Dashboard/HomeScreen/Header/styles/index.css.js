import {StyleSheet} from 'react-native';

import * as fontSize from '../../../../../Utils/FontSize';
const styles = StyleSheet.create({
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
});

export default styles;
