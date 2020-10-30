import {StyleSheet, Dimensions} from 'react-native';
import Color from '../../../../Utils/Color';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  formController: {
    marginHorizontal: 10,
    justifyContent: 'center',
    flex: 0.2,
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
    overflow: 'hidden',
  },
  chosenImg: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Color.primary,
    overflow: 'hidden',
    flex: 0.35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    width: '100%',
    height: '100%',
  },
  customImgContainer: {
    padding: 5,
    flex: 0.5,
  },
  customImg: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 20,
    width: 0.4 * width,
    flex: 0.9,
    borderWidth: 2,
    borderColor: Color.primary,
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
