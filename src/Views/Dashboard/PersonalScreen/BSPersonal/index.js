import React, {useState, useEffect, useRef} from 'react';
import {View, Dimensions, Keyboard} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {TextInput} from 'react-native-paper';

import Text, {BoldText} from '../../../../Components/Text';
import TextButton from '../../../../Components/TextButton';
import Color from '../../../../Utils/Color';

import * as fontSize from '../../../../Utils/FontSize';
import styles from './styles/index.css';

const BSPersonal = React.forwardRef((props, ref) => {
  const {addNewMember} = props;
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
      snapPoints={[BSHeight, 0]}
      initialSnap={1}
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
          <BoldText>Danh sách phòng được phép truy cập</BoldText>
          <TextButton text="Thêm Mới" onPress={() => handleOnClickAdd()} />
        </View>
      )}
    />
  );
});

export default BSPersonal;
