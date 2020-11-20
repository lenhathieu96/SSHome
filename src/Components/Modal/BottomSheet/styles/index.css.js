import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  bsContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    width,
  },
  header: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  body: {
    backgroundColor: 'white',
    flexGrow: 1,
    paddingHorizontal: 5,
  },
});

export default styles;
