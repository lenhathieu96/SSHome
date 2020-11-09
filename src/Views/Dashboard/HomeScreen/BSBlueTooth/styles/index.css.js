import {StyleSheet, Dimensions} from 'react-native';
import * as fontSize from '../../../../../Utils/FontSize';
import Color from '../../../../../Utils/Color';

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  Header: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Color.secondary,
    height: 0.05 * height,
  },
  Body: {
    backgroundColor: 'white',
    height: 0.75 * height,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: fontSize.larger,
    alignSelf: 'center',
    marginVertical: 10,
  },
  timesBtn: {
    alignSelf: 'flex-end',
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
