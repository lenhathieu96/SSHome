import React from 'react';
import {View, Dimensions, TouchableOpacity, FlatList} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import IconButton from '../../../../Components/IconButton';
import Text, {BoldText} from '../../../../Components/Text';
import Color from '../../../../Utils/Color';

import * as fontSize from '../../../../Utils/FontSize';
import styles from './styles/index.css';

const BSPersonal = React.forwardRef((props, ref) => {
  const {height} = Dimensions.get('window');
  const BSHeight = 0.8 * height;

  return (
    <BottomSheet
      ref={ref}
      snapPoints={[BSHeight, 0]}
      initialSnap={1}
      enabledInnerScrolling={true}
      enabledGestureInteraction={false}
      renderContent={() => (
        <View style={styles.Body}>
          <Text>user</Text>
        </View>
      )}
    />
  );
});

export default BSPersonal;
