import {StyleSheet, Dimensions} from 'react-native';
import Color from '../../../../Utils/Color';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  formController: {
    marginHorizontal: 10,
    justifyContent: 'center',
  },

  groupImageContainer: {
    flex: 0.3,
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  defaultImg: {
    flex: 0.35,
    borderRadius: 20,
    width: '100%',
    height: '100%',
  },
  chosenImg: {
    flex: 0.35,
    borderWidth: 2,
    borderColor: Color.primary,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
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
    flex: 0.4,
  },
  customImg: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 20,
    width: 0.4 * width,
    flex: 1,
    borderWidth: 2,
    borderColor: Color.primary,
  },
  btnAddContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
  },

  btnAddRoom: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
});

export default styles;
