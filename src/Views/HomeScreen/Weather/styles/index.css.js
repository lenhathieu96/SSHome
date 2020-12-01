import {StyleSheet} from 'react-native';

import Color from '../../../../Utils/Color';
import * as fontSize from '../../../../Utils/FontSize';
const styles = StyleSheet.create({
  infoContainer: {
    flex: 0.15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flex: 0.15,
    justifyContent: 'center',
  },
  weatherIcon: {
    alignSelf: 'center',
    width: fontSize.biggest,
    height: fontSize.biggest,
  },
  weatherContainer: {
    flex: 0.3,
    alignItems: 'center',
  },

  placeHolderMedia: {
    alignSelf: 'center',
    borderRadius: 50,
    width: fontSize.biggest,
    height: fontSize.biggest,
  },
  placeHolderLine: {
    width: 80,
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 20,
  },

  txtWeatherContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  txtWeather: {
    fontSize: fontSize.larger,
    marginBottom: 3,
  },
  txtInfo: {
    textAlign: 'center',
    color: Color.blue,
    marginVertical: 10,
  },
});

export default styles;
