import React, {useState, useRef, useEffect} from 'react';
import {View, Dimensions, Keyboard, FlatList} from 'react-native';
import {RadioButton, TextInput} from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';

import Text, {BoldText, ErrorText} from '../../../../Components/Text';
import IconButton from '../../../../Components/IconButton';
import TextButton from '../../../../Components/TextButton';

import Color from '../../../../Utils/Color';
import * as fontSize from '../../../../Utils/FontSize';
import styles from './styles/index.css';

const BSPersonal = React.forwardRef((props, ref) => {
  const {onConfigMember, roomList, memberProfile} = props;
  const {height} = Dimensions.get('window');
  const BSHeight = 0.7 * height;
  const inputRef = useRef();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [memberRooms, setmemberRooms] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  const [txtEror, setTxtError] = useState('');

  const handleOnClickAdd = () => {
    if (name === '') {
      setTxtError('Tên thành viên không được để trống');
      return;
    } else if (phone === '') {
      setTxtError('Số điện thoại không được để trống');
      return;
    } else if (memberRooms.length === 0) {
      setTxtError('Thành viên phải có tối thiểu 1 phòng được phép truy cập');
      return;
    } else {
      if (memberRooms.length >= 1) {
        let member = {
          name,
          phone,
          id: memberProfile.id ? memberProfile.id : '',
          availableRooms: memberRooms,
        };
        onConfigMember(member, isUpdate);
      }
    }
  };

  const updatememberRooms = (roomID) => {
    let rooms = [...memberRooms];
    const existsRoom = rooms.find((room) => roomID === room);

    if (existsRoom) {
      if (rooms.length === 1) {
        setTxtError('Thành viên phải có tối thiểu 1 phòng được phép truy cập');
      } else {
        setmemberRooms(rooms.filter((room) => room !== roomID));
        setTxtError('');
      }
    } else {
      rooms.push(roomID);
      setmemberRooms(rooms);
      setTxtError('');
    }
  };

  useEffect(() => {
    setTxtError('');
    setName(memberProfile.name);
    setPhone(memberProfile.phone);
    setmemberRooms(memberProfile.availableRoom);
    if (memberProfile.name !== '') {
      setUpdate(true);
    } else {
      setUpdate(false);
    }
    return Keyboard.dismiss();
  }, [memberProfile]);

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
            iconName="minus"
            onPress={() => {
              Keyboard.dismiss;
              ref.current.snapTo(1);
            }}
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
                    <RadioButton.Android
                      value={item.id}
                      status={
                        memberRooms
                          ? memberRooms.filter((room) => room === item.id)
                              .length > 0
                            ? 'checked'
                            : 'unchecked'
                          : 'unchecked'
                      }
                      onPress={() => updatememberRooms(item.id)}
                    />
                    <Text>{item.name}</Text>
                  </View>
                );
              }}
            />
          </View>
          <ErrorText>{txtEror}</ErrorText>
          <TextButton
            text={isUpdate ? 'Cập Nhập' : 'Thêm Mới'}
            onPress={() => handleOnClickAdd()}
          />
        </View>
      )}
    />
  );
});

export default BSPersonal;
