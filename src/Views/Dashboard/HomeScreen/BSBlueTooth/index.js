import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import Text, {BoldText} from '../../../../Components/Text';

import Color from '../../../../Utils/Color';
import * as fontSize from '../../../../Utils/FontSize';
import styles from './styles/index.css';

const BSBlueTooth = React.forwardRef((props, ref) => {
  const {height} = Dimensions.get('window');
  const BSHeight = 0.8 * height;

  const {connectDevice, listDevice, handleStopScan} = props;

  return (
    <BottomSheet
      ref={ref}
      snapPoints={[BSHeight, 0]}
      initialSnap={1}
      onCloseEnd={() => handleStopScan()}
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
        </View>
      )}
      renderContent={() => (
        <View style={styles.Body}>
          <BoldText text="Các Thiết Bị Lân Cận" style={styles.title} />
          {listDevice.length === 0 ? (
            <View style={styles.listContainer}>
              <ActivityIndicator size={fontSize.biggest} color={Color.blue} />
              <Text style={styles.txtInfo}>Đang quét thiết bị xung quanh</Text>
            </View>
          ) : (
            <FlatList
              data={listDevice}
              extraData={listDevice}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => connectDevice(item)}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'gray' : 'white',
                    padding: 10,
                    borderRadius: 20,
                  }}>
                  <Text>ID: {item.id}</Text>
                  <Text>Tên: {item.name === null ? 'No Name' : item.name}</Text>
                  <Text>
                    ServiceUID:{' '}
                    {item.advertising.serviceUUIDs
                      ? item.advertising.serviceUUIDs
                      : '[]'}
                  </Text>
                  <Text>
                    {item.advertising.isConnectable
                      ? 'Có thể kết nối'
                      : 'Không thể kết nối'}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}
    />
  );
});

export default BSBlueTooth;

BSBlueTooth.propTypes = {
  listDevice: PropTypes.array.isRequired,
  connectDevice: PropTypes.func.isRequired,
};
