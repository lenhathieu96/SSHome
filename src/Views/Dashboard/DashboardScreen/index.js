import React from 'react';
import {SafeAreaView, View, FlatList} from 'react-native';
import Text, {BoldText} from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';

import Icon from 'react-native-vector-icons/FontAwesome5';
import RoomButton from './RoomButton';

import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
import styles from './styles/index.css';

const data = [
  {
    name: 'Phòng Khách',
    roomtypeID: 0,
    deviceQuantity: 4,
  },
  {
    name: 'Phòng Ngủ',
    roomtypeID: 1,
    deviceQuantity: 5,
  },
  {
    name: 'Phòng Bếp',
    roomtypeID: 2,
    deviceQuantity: 6,
  },
  {
    name: 'Phòng Tắm',
    roomtypeID: 3,
    deviceQuantity: 8,
  },
];

export default function Dashboard({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* Info Container */}
      <View style={styles.infoContainer}>
        <View styles={styles.weatherContainer}>
          <Icon
            name="cloud-showers-heavy"
            size={fontSize.bigger}
            color={Color.primary}
            style={{alignSelf: 'center'}}
          />
          <Text> Mưa</Text>
        </View>
        <View styles={styles.weatherContainer}>
          <View style={styles.txtWeatherContainer}>
            <BoldText style={styles.txtWeather}>{32}</BoldText>
            <Text>°C</Text>
          </View>
          <Text> Ngoài Trời</Text>
        </View>
        <View styles={styles.weatherContainer}>
          <View style={styles.txtWeatherContainer}>
            <BoldText style={styles.txtWeather}>{26}</BoldText>
            <Text>°C</Text>
          </View>
          <Text> Trong Nhà</Text>
        </View>
      </View>

      {/* Room List */}
      <View style={styles.listContainer}>
        <BoldText style={styles.listTitle}>Danh Sách Phòng</BoldText>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <RoomButton navigation={navigation} roomData={item} />
          )}
          contentContainerStyle={styles.roomlist}
          numColumns={2}
        />
        <TextButton
          text="Thêm Phòng"
          onPress={() => navigation.navigate('addroomScr')}
          style={styles.btnAddRoom}
        />
      </View>
    </SafeAreaView>
  );
}
