import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {View, Dimensions, FlatList, SafeAreaView} from 'react-native';

import Text, {BoldText, ErrorText} from '../../../Components/Text';
import RadioButton from '../../../Components/RadioButton';
import TextButton from '../../../Components/TextButton';
import TextInput from '../../../Components/TextInput';
import BottomSheet from '../../../Components/Modal/BottomSheet';

import styles from './styles/index.css';

const BSAddNewDevice = React.forwardRef((props, ref) => {
  const {height} = Dimensions.get('window');
  const BSHeight = 0.8 * height;

  const {ports, onAddNewDevice} = props;

  const [deviceName, setDeviceName] = useState('');
  const [portList, setPortList] = useState([]);
  const [chosenPort, choosePort] = useState();
  const [txtError, setTxtError] = useState('');
  const [isMotionDevice, setMotionDevice] = useState(false);

  useEffect(() => {
    const allPorts = [
      2,
      4,
      5,
      12,
      13,
      14,
      16,
      17,
      18,
      19,
      21,
      22,
      23,
      25,
      26,
      27,
      32,
      33,
    ];
    const emptyPorts = allPorts.filter(
      (port) => ports.indexOf(port) < 0,
      ports,
    );
    setPortList(emptyPorts);
    return () => {
      choosePort();
      setDeviceName('');
      setTxtError('');
    };
  }, [ports]);

  const handleBtnAddPress = () => {
    if (!deviceName) {
      setTxtError('Tên thiết bị không được để trống');
    } else if (!chosenPort) {
      setTxtError('Bạn phải chọn một cổng kết nối');
    } else {
      setTxtError('');
      let device = {
        name: deviceName,
        port: chosenPort,
        status: false,
        isMotion: isMotionDevice,
      };
      onAddNewDevice(device);
      setDeviceName('');
      choosePort();
      setMotionDevice(false);
    }
  };

  return (
    <BottomSheet
      ref={ref}
      swipeable={false}
      snapPoints={[BSHeight, 0]}
      renderContent={() => (
        <View style={styles.Body}>
          <BoldText text="Thiết Bị Mới" style={styles.title} />
          <TextInput
            value={deviceName}
            onChangeText={(text) => setDeviceName(text)}
            label="Tên Thiết Bị"
            placeholder="Nhập tên thiết bị"
          />
          <Text style={{marginVertical: 10}}>Chọn cổng kết nối:</Text>
          <FlatList
            style={styles.listPorts}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={portList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <RadioButton
                  style={styles.radioButton}
                  status={
                    chosenPort
                      ? chosenPort === item
                        ? 'checked'
                        : 'unchecked'
                      : 'unchecked'
                  }
                  title={`Cổng ${item}`}
                  onPress={() => choosePort(item)}
                />
              );
            }}
          />
          <View>
            <Text style={styles.txtDesc}>
              - Dành cho các thiết bị cần chuyển động như cửa, rèm ...
            </Text>
            <RadioButton
              status={isMotionDevice ? 'checked' : 'unchecked'}
              onPress={() => setMotionDevice(!isMotionDevice)}
              title="Thiết bị chuyển động"
            />
          </View>
          <SafeAreaView style={styles.btnContainer}>
            <ErrorText>{txtError}</ErrorText>
            <TextButton
              text="Thêm Thiết Bị"
              onPress={() => handleBtnAddPress()}
            />
          </SafeAreaView>
        </View>
      )}
    />
  );
});

export default BSAddNewDevice;

BSAddNewDevice.propTypes = {
  ports: PropTypes.array.isRequired,
  onAddNewDevice: PropTypes.func,
};
