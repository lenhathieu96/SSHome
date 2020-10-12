import {StyleSheet, Dimensions} from 'react-native';

import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';

const {width, height} = Dimensions.get('window');
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
    backgroundColor: Color.secondary,
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 5,
  },
  listTitle: {
    color: Color.primary,
    fontSize: fontSize.huge,
    alignSelf: 'center',
    marginTop: 10,
    flex: 0.1,
  },
  roomlist: {
    flex: 0.9,
  },
  floatButton: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: 0.2 * width,
    height: 0.2 * width,
    borderRadius: (0.2 * width) / 2,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default styles;
