import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Text, {BoldText} from '../../../../Components/Text';

import User from '../../../../Assets/Images/profile.png';
import styles from './styles/index.css';

export default function MemberList(props) {
  const {data, onPressMember, onLongPressMember} = props;
  const blankUser = {name: '', phone: '', availableRoom: []};

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    let users = [...data];
    users.unshift({});
    setUserList(users);
  }, [data]);

  return (
    <View style={styles.container}>
      <FlatList
        data={userList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => onPressMember(index === 0 ? blankUser : item)}
            onLongPress={() => {
              if (index !== 0) {
                onLongPressMember(item);
              }
            }}>
            {index === 0 ? (
              <View style={styles.itemContainer}>
                <Image source={User} style={styles.userImage} />
                <BoldText>Thêm thành viên</BoldText>
              </View>
            ) : (
              <View style={styles.itemContainer}>
                <Image source={User} style={styles.userImage} />
                <BoldText>{item.name}</BoldText>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
