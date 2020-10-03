import {StyleSheet, Dimensions} from 'react-native';
import Color from '../../../../Utils/Color';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  formController: {
    margin: 10,
  },
  RadioButtonsContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-evenly',
  },
  imageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    borderRadius: 20,
    width: 0.95 * width,
    height: (0.95 * width * 3) / 4,
    zIndex: 0,
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  btnCamera: {
    zIndex: 1,
    position: 'absolute',
  },

  btnAddRoom: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
});

export default styles;
