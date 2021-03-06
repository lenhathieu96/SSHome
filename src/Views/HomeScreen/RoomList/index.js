import React, {useRef, useState, useEffect} from 'react';
import {View, Dimensions, Animated} from 'react-native';

import RoomButton from './RoomButton';

import styles from './styles/index.css';

export default function RoomList(props) {
  const {onRoomPress, onRoomLongPress, data} = props;
  const {width} = Dimensions.get('window');
  const listRef = useRef();

  const ITEM_SIZE = 0.75 * width;
  const SPACER_SIZE = (width - ITEM_SIZE) / 2;
  const scrollX = useRef(new Animated.Value(0)).current;

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const roomlist = [...data];
    roomlist.push({});
    roomlist.unshift({});
    setRooms(roomlist);
  }, [data]);

  return (
    <Animated.FlatList
      ref={listRef}
      style={styles.roomlist}
      contentContainerStyle={{alignItems: 'flex-end'}}
      data={rooms}
      keyExtractor={(item, index) => index.toString()}
      snapToInterval={ITEM_SIZE}
      bounces={false}
      horizontal={true}
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
          outputRange: [0, -(0.15 * ITEM_SIZE), 0],
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
            roomData={item}
            opacity={opacity}
            translateY={translateY}
            onPress={onRoomPress}
            onLongPress={onRoomLongPress}
          />
        );
      }}
    />
  );
}
