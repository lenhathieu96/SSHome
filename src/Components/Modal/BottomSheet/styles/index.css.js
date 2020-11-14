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
    flex: 0.1,
  },
  body: {
    backgroundColor: 'white',
    flex: 0.9,
    paddingHorizontal: 5,
  },
});

export default styles;
