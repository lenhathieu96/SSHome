import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';

import Text, {BoldText} from '../../../../Components/Text';
import TextButton from '../../../../Components/TextButton';
import BottomSheet from '../../../../Components/Modal/BottomSheet';

import Color from '../../../../Utils/Color';
import * as fontSize from '../../../../Utils/FontSize';
import device_icon from '../../../../Assets/Images/device_icon.jpg';
import styles from './styles/index.css';

const BSBlueTooth = React.forwardRef((props, ref) => {
  const {
    connectDevice,
    listDevice,
    isScanning,
    handleStopScan,
    hanldeStartScan,
  } = props;

  return (
    <BottomSheet
      swipeable={false}
      ref={ref}
      renderContent={() => (
        <View style={styles.Body}>
          <BoldText text="Các Thiết Bị Lân Cận" style={styles.title} />
          <TextButton
            text={isScanning ? 'Dừng quét' : 'Quét lại'}
            onPress={() => (isScanning ? handleStopScan() : hanldeStartScan())}
            style={styles.btnScan}
            textStyle={{color: isScanning ? Color.primary : Color.secondary}}
          />
          {isScanning ? (
            <View style={styles.listContainer}>
              <ActivityIndicator size={fontSize.biggest} color={Color.blue} />
              <Text style={styles.txtInfo}>
                Đang tìm kiếm các thiết bị xung quanh
              </Text>
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
