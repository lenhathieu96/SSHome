import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import Text, {BoldText} from '../../../../Components/Text';
import IconButton from '../../../../Components/IconButton';

import Color from '../../../../Utils/Color';
import * as fontSize from '../../../../Utils/FontSize';
import device_icon from '../../../../Assets/Images/device_icon.jpg';
import styles from './styles/index.css';

const BSBlueTooth = React.forwardRef((props, ref) => {
  const {height} = Dimensions.get('window');
  const BSHeight = 0.8 * height;

  const {
    connectDevice,
    listDevice,
    isScanning,
    handleStopScan,
    hanldeStartScan,
  } = props;

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
          <IconButton
            iconName="x"
            iconColor={Color.primary}
            iconSize={fontSize.biggest}
            style={styles.timesBtn}
            onPress={() => {
              ref.current.snapTo(1);
            }}
          />
        </View>
      )}
      renderContent={() => (
        <View style={styles.Body}>
          <BoldText text="Các Thiết Bị Lân Cận" style={styles.title} />
          {isScanning ? (
            <View style={styles.listContainer}>
              <ActivityIndicator size={fontSize.biggest} color={Color.blue} />
              <Text style={styles.txtInfo}>Đang quét thiết bị xung quanh</Text>
            </View>
          ) : listDevice.length === 0 ? (
            <View style={styles.listContainer}>
              <Text style={styles.txtInfo}>
                Không tìm thấy các thiết bị xung quanh
              </Text>
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
                  style={styles.deviceDataContainer}>
                  <Image source={device_icon} style={styles.deviceIcon} />
                  <View style={styles.deviceData}>
                    <View style={{flexDirection: 'row', marginVertical: 5}}>
                      <Text>Tên: </Text>
                      <Text>
                        {item.name === null ? 'Không xác định' : item.name}
                      </Text>
                    </View>
                    <Text
                      style={
                        item.advertising.isConnectable
                          ? styles.connectable
                          : styles.unconnectable
                      }>
                      {item.advertising.isConnectable
                        ? 'Có thể kết nối'
                        : 'Không thể kết nối'}
                    </Text>
                  </View>
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
