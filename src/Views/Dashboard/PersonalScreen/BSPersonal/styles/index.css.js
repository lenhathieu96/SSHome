import {StyleSheet} from 'react-native';
import * as fontSize from '../../../../../Utils/FontSize';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flex: 1,
  },
  BSTitle: {
    textAlign: 'center',
    fontSize: fontSize.large,
    marginHorizontal: 5,
  },
  input: {
    marginHorizontal: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  radioButtonContainer: {
    marginHorizontal: 5,
  },
  radioButton: {
    flex: 0.5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
