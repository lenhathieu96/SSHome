import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {TextInput, RadioButton} from 'react-native-paper';
import {View, Dimensions, TouchableOpacity, FlatList} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import Text, {BoldText, ErrorText} from '../../../../Components/Text';
import TextButton from '../../../../Components/TextButton';

import Color from '../../../../Utils/Color';
import styles from './styles/index.css';
import {SafeAreaView} from 'react-native-safe-area-context';

const BSAddNewDevice = React.forwardRef((props, ref) => {
  const {height} = Dimensions.get('window');
  const BSHeight = 0.8 * height;

  const {devices, onAddNewDevice} = props;

  const [deviceName, setDeviceName] = useState('');
  const [portList, setPortList] = useState([]);
  const [chosenPort, choosePort] = useState();
  const [txtError, setTxtError] = useState('');

  useEffect(() => {
    const allPorts = Array.from(Array(15).keys()).map((number) => number + 1);
    const usedPorts = devices.map((device) => device.port).slice(0, -1);
    const emptyPorts = allPorts.filter(
      (port) => usedPorts.indexOf(port) < 0,
      usedPorts,
    );
    setPortList(emptyPorts);
    return () => {
      choosePort();
      setDeviceName('');
      setTxtError('');
    };
  }, [devices]);

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
      };
      onAddNewDevice(device);
    }
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={[BSHeight, 0]}
      initialSnap={1}
      enabledInnerScrolling={true}
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
          <BoldText text="Thiết Bị Mới" style={styles.title} />
          <TextInput
            value={deviceName}
            onChangeText={(text) => setDeviceName(text)}
            label="Tên Thiết Bị"
            mode="outlined"
            style={{flex: 0.2}}
            theme={{
              colors: {primary: Color.primary, underlineColor: 'transparent'},
            }}
            onChange={(text) => setDeviceName(text)}
          />
          <Text style={styles.text}>Chọn cổng kết nối:</Text>
          <FlatList
            styl
            contentContainerStyle={styles.listRoom}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={portList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <View style={styles.radioButton}>
                  <RadioButton.Android
                    value={item}
                    status={
                      chosenPort
                        ? chosenPort === item
                          ? 'checked'
                          : 'unchecked'
                        : 'unchecked'
                    }
                    onPress={() => choosePort(item)}
                  />
                  <Text>{`Cổng ${item}`}</Text>
                </View>
              );
            }}
          />
          <ErrorText>{txtError}</ErrorText>
          <SafeAreaView style={styles.btnContainer}>
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
  devices: PropTypes.array.isRequired,
  onAddNewDevice: PropTypes.func,
};
