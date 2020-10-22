import React, {useState, useRef} from 'react';
import {View, Dimensions, Keyboard, FlatList} from 'react-native';
import {RadioButton, TextInput} from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';

import Text, {BoldText} from '../../../../Components/Text';
import IconButton from '../../../../Components/IconButton';
import TextButton from '../../../../Components/TextButton';

import Color from '../../../../Utils/Color';
import * as fontSize from '../../../../Utils/FontSize';
import styles from './styles/index.css';

const BSPersonal = React.forwardRef((props, ref) => {
  const {addNewMember, roomList} = props;
  const {height} = Dimensions.get('window');
  const BSHeight = 0.7 * height;
  const inputRef = useRef();

  const [name, setName] = useState();
  const [phone, setPhone] = useState();

  const handleOnClickAdd = () => {
    let member = {
      name,
      phone,
      availableRoom: [],
    };
    addNewMember(member);
  };

  return (
    <BottomSheet
      ref={ref}
      onCloseStart={() => Keyboard.dismiss()}
      enabledInnerScrolling={true}
      enabledContentGestureInteraction={false}
      snapPoints={[BSHeight, 0]}
      initialSnap={1}
      renderHeader={() => (
        <View style={styles.Header}>
          <IconButton
            style={{marginTop: 10}}
            iconSize={fontSize.huge}
            iconName="grip-lines"
            onPress={() => ref.current.snapTo(1)}
          />
        </View>
      )}
      renderContent={() => (
        <View style={styles.Body}>
          <BoldText style={styles.BSTitle}>Thành Viên</BoldText>

          <TextInput
            ref={inputRef}
            value={name}
            onChangeText={(text) => setName(text)}
            label="Tên thành viên"
            mode="outlined"
            style={styles.input}
            theme={{
              colors: {primary: Color.primary, underlineColor: 'transparent'},
            }}
          />
          <TextInput
            value={phone}
            onChangeText={(text) => setPhone(text)}
            label="Số điện thoại"
            keyboardType="number-pad"
            mode="outlined"
            style={styles.input}
            theme={{
              colors: {primary: Color.primary, underlineColor: 'transparent'},
            }}
          />
          <BoldText>Phòng được phép truy cập</BoldText>
          <View style={styles.radioButtonContainer}>
            <FlatList
              contentContainerStyle={styles.listRoom}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={roomList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <View style={styles.radioButton}>
                    <RadioButton.Android value={1} />
                    <Text>Phòng Khách</Text>
                  </View>
                );
              }}
            />
          </View>

          <TextButton text="Thêm Mới" onPress={() => handleOnClickAdd()} />
        </View>
      )}
    />
  );
});

export default BSPersonal;
