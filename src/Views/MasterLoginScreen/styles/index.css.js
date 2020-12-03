import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  imgContainer: {
    flex: 0.25,
  },
  img: {
    flex: 1,
    width: null,
    height: null,
  },
  input: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  body: {
    marginHorizontal: 10,
    flex: 0.25,
    justifyContent: 'space-evenly',
  },
  btnLogin: {
    marginHorizontal: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnOption: {alignSelf: 'center', color: 'black'},
});

export default styles;
