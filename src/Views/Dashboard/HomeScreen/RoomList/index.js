import React, {useRef} from 'react';
import {View, Dimensions, Animated} from 'react-native';

import RoomButton from './RoomButton';

import styles from './styles/index.css';
const data = [
  {},
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

  {
    name: 'Phòng Tắm',
    roomtypeID: 3,
    deviceQuantity: 8,
  },
  {},
];
export default function RoomList({navigation}) {
  const {width} = Dimensions.get('window');

  const ITEM_SIZE = 0.7 * width;
  const SPACER_SIZE = (width - ITEM_SIZE) / 2;
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <Animated.FlatList
      style={styles.roomlist}
      contentContainerStyle={{alignItems: 'flex-end'}}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      snapToInterval={ITEM_SIZE}
      //speed of scroll, normal is 0.9
      // decelerationRate={1}
      bounces={false}
      horizontal
      snapToAlignment="start"
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
        useNativeDriver: true,
      })}
      renderItem={({item, index}) => {
        const inputRange = [
          (index - 2) * ITEM_SIZE,
          (index - 1) * ITEM_SIZE,
          index * ITEM_SIZE,
        ];
        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [0, -(0.2 * ITEM_SIZE), 0],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
        });
        if (!item.name) {
          return (
            <View
              style={{
                width: SPACER_SIZE,
              }}
            />
          );
        }
        return (
          <RoomButton
            navigation={navigation}
            roomData={item}
            opacity={opacity}
            translateY={translateY}
          />
        );
      }}
    />
  );
}