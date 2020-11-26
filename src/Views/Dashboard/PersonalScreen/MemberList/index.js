import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {BoldText} from '../../../../Components/Text';

import blankAvatar from '../../../../Assets/Images/profile.png';
import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';
import styles from './styles/index.css';

export default function MemberList(props) {
  const {width} = Dimensions.get('window');
  const {data, onPressMember, onLongPressMember} = props;
  const blankUser = {name: '', phone: '', availableRoom: []};

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    let users = [...data];
    users.unshift({});
    setUserList(users);
  }, [data]);

  return (
    <FlatList
      style={{padding: 10}}
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
            <View style={[styles.itemContainer, {marginHorizontal: 15}]}>
              <Icon
                name="user-plus"
                style={styles.memberAvatar}
                size={1.7 * fontSize.biggest}
                color={Color.secondary}
              />
              <View style={[styles.memberNameContainer, {width: 0.4 * width}]}>
                <BoldText style={styles.memberName}>Thêm thành viên</BoldText>
              </View>
            </View>
          ) : (
            <View style={styles.itemContainer}>
              <Image
                source={item.avatar ? {uri: item.avatar} : blankAvatar}
                style={styles.memberAvatar}
              />
              <View style={styles.memberNameContainer}>
                <BoldText style={styles.memberName}>{item.name}</BoldText>
              </View>
            </View>
          )}
        </TouchableOpacity>
      )}
    />
  );
}
