import React, {useState, useEffect} from 'react';
import {
  View,
  Keyboard,
  FlatList,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
} from 'react-native';

import BottomSheet from '../../../../Components/Modal/BottomSheet';
import RadioButton from '../../../../Components/RadioButton';
import {BoldText, ErrorText} from '../../../../Components/Text';
import TextInput from '../../../../Components/TextInput';
import TextButton from '../../../../Components/TextButton';

import styles from './styles/index.css';

const BSPersonal = React.forwardRef((props, ref) => {
  const {onConfigMember, roomList, memberProfile} = props;
  const {height} = Dimensions.get('window');
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
    if (!memberRooms) {
      let rooms = [roomID];
      setmemberRooms(rooms);
    } else {
      let rooms = [...memberRooms];
      const existsRoom = rooms.find((room) => roomID === room);
      if (existsRoom) {
        if (rooms.length === 1) {
          setTxtError(
            'Thành viên phải có tối thiểu 1 phòng được phép truy cập',
          );
        } else {
          setmemberRooms(rooms.filter((room) => room !== roomID));
          setTxtError('');
        }
      } else {
        rooms.push(roomID);
        setmemberRooms(rooms);
        setTxtError('');
      }
    }
  };

  useEffect(() => {
    setTxtError('');
    setName(memberProfile.name);
    setPhone(memberProfile.phone);
    setmemberRooms(memberProfile.availableRooms);
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
      swipeable={false}
      modalHeight={0.8 * height}
      renderContent={() => (
        <ScrollView contentContainerStyle={styles.container}>
          <BoldText style={styles.BSTitle}>Thành Viên</BoldText>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            label="Tên thành viên"
            style={styles.input}
          />
          <TextInput
            value={phone}
            onChangeText={(text) => setPhone(text)}
            label="Số điện thoại"
            keyboardType="number-pad"
            style={styles.input}
          />
          <BoldText style={{marginHorizontal: 5}}>
            Phòng được phép truy cập
          </BoldText>
          <View style={styles.radioButtonContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={roomList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <View style={styles.radioButton}>
                    <RadioButton
                      status={
                        memberRooms
                          ? memberRooms.filter((room) => room === item.id)
                              .length > 0
                            ? 'checked'
                            : 'unchecked'
                          : 'unchecked'
                      }
                      onPress={() => updatememberRooms(item.id)}
                      title={item.name}
                    />
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
        </ScrollView>
      )}
    />
  );
});

export default BSPersonal;
