import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import Text, {BoldText, ErrorText} from '../../../../Components/Text';
import RadioButton from '../../../../Components/RadioButton';
import TextButton from '../../../../Components/TextButton';
import TextInput from '../../../../Components/TextInput';

import styles from './styles/index.css';

const BSAddNewDevice = React.forwardRef((props, ref) => {
  const {height} = Dimensions.get('window');
  const BSHeight = 0.8 * height;

  const {ports, onAddNewDevice} = props;
  console.log(ports, 'used port');
  const [deviceName, setDeviceName] = useState('');
  const [portList, setPortList] = useState([]);
  const [chosenPort, choosePort] = useState();
  const [txtError, setTxtError] = useState('');

  useEffect(() => {
    const allPorts = Array.from(Array(20).keys()).map((number) => number + 1);
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
      };
      onAddNewDevice(device);
    }
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={[BSHeight, 0]}
      initialSnap={1}
      enabledGestureInteraction={false}
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
  devices: PropTypes.array.isRequired,
  onAddNewDevice: PropTypes.func,
};
