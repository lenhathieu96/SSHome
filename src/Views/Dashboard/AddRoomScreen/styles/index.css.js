import {StyleSheet, Dimensions} from 'react-native';
import Color from '../../../../Utils/Color';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  formController: {
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 0.1,
    justifyContent: 'center',
    padding: 5,
  },
  groupImageContainer: {
    flex: 0.4,
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  defaultImg: {
    flex: 0.4,
    width: '100%',
    height: '100%',
    borderRadius: 20,
    opacity: 0.5,
    overflow: 'hidden',
  },
  chosenImg: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Color.primary,
    overflow: 'hidden',
    flex: 0.4,
    width: '100%',
    height: '100%',
  },
  customImgContainer: {
    padding: 5,
    flex: 0.5,
  },
  customImg: {
    alignSelf: 'center',
    marginTop: 20,
    width: 0.4 * width,
    flex: 0.9,
    borderColor: Color.primary,
    borderWidth: 1.5,
    borderRadius: 20,
  },
  img: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAddContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
  },

  btnAddRoom: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
});

export default styles;
