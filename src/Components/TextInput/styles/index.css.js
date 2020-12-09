import {StyleSheet} from 'react-native';

import Color from '../../../Utils/Color';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputContainer_Focus: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: Color.primary,
  },
  inputContainer_unFocus: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: Color.background,
  },

  label_Focus: {
    position: 'absolute',
    zIndex: 1,
    top: -10,
    left: 20,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    color: Color.primary,
  },
  label_unFocus: {
    position: 'absolute',
    zIndex: 1,
    top: -10,
    left: 20,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    color: Color.unactive,
  },
});

export default styles;
