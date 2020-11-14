import {StyleSheet} from 'react-native';
import * as fontSize from '../../../../../Utils/FontSize';
import Color from '../../../../../Utils/Color';

const styles = StyleSheet.create({
  Body: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: fontSize.larger,
    alignSelf: 'center',
    marginVertical: 10,
  },
  btnScan: {
    width: 100,
    alignSelf: 'center',
    padding: 5,
    backgroundColor: 'transparent',
  },
  listContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtInfo: {
    textAlign: 'center',
    color: Color.blue,
    marginVertical: 10,
  },
  deviceDataContainer: {
    borderRadius: 30,
    margin: 5,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    backgroundColor: 'white',
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,
  },
  deviceIcon: {
    width: fontSize.biggest * 2,
    height: fontSize.biggest * 2,
    marginRight: 10,
  },
  deviceData: {
    flex: 1,
    justifyContent: 'center',
  },
  connectable: {
    marginVertical: 5,
    color: Color.green,
  },
  unconnectable: {
    marginVertical: 5,
    color: Color.red,
  },
});

export default styles;
