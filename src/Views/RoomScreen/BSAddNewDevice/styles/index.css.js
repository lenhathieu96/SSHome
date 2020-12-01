import {StyleSheet} from 'react-native';
import * as fontSize from '../../../../Utils/FontSize';

const styles = StyleSheet.create({
  Body: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: fontSize.larger,
    alignSelf: 'center',
    marginBottom: 20,
  },
  timesBtn: {
    alignSelf: 'flex-end',
  },
  radioButton: {
    flex: 0.33,
    alignSelf: 'flex-start',
  },
  listPorts: {
    flex: 0.6,
    paddingHorizontal: 5,
  },
  btnContainer: {
    flex: 0.3,
    justifyContent: 'center',
  },
  txtDesc: {
    fontStyle: 'italic',
  },
});

export default styles;
