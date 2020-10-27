import React from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import BLEManager from 'react-native-ble-manager';
import IconButton from '../../../../Components/IconButton';
import Text, {BoldText} from '../../../../Components/Text';
import Color from '../../../../Utils/Color';

import * as fontSize from '../../../../Utils/FontSize';
import styles from './styles/index.css';

const BSBlueToothSearching = React.forwardRef((props, ref) => {
  const {height} = Dimensions.get('window');
  const BSHeight = 0.8 * height;

  const {stopSearchingBLDevices, listDevice} = props;
  return (
    <BottomSheet
      ref={ref}
      snapPoints={[BSHeight, 0]}
      initialSnap={1}
      enabledInnerScrolling={true}
      enabledGestureInteraction={false}
      renderHeader={() => (
        <View style={styles.Header}>
          <TouchableOpacity
            style={styles.lines}
            onPress={() => {
              ref.current.snapTo(1);
            }}
          />
          <BoldText text="Các Thiết Bị Lân Cận" style={styles.Title} />
        </View>
      )}
      renderContent={() => (
        <View style={styles.Body}>
          <FlatList
            data={listDevice}
            extraData={listDevice}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  BLEManager.connect(item.id)
                    .then(() => Alert.alert('connect successed'))
                    .catch((error) => {
                      console.log('connect fail', error),
                        Alert.alert('Connect failed');
                    })
                }
                style={{
                  backgroundColor: index % 2 === 0 ? 'gray' : 'white',
                  padding: 10,
                  borderRadius: 20,
                }}>
                <Text>ID: {item.id}</Text>
                <Text>Tên: {item.name === null ? 'No Name' : item.name}</Text>
                <Text>
                  {item.advertising.isConnectable
                    ? 'Có thể kết nối'
                    : 'Không thể kết nối'}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    />
  );
});

export default BSBlueToothSearching;
