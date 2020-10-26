import React, {useEffect, useState, useRef} from 'react';
import {View, Dimensions, SafeAreaView} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import FastImage from 'react-native-fast-image';

import RootContainer from '../../../Components/RootContainer';
import {BoldText} from '../../../Components/Text';
import DeviceButton from './DeviceButton';
import TextButton from '../../../Components/TextButton';
import IconButton from '../../../Components/IconButton';

import Color from '../../../Utils/Color';
import * as fontSize from '../../../Utils/FontSize';
import styles from './styles/index.css';

export default function RoomDetailScreen({navigation, route}) {
  const {room} = route.params;
  const {width} = Dimensions.get('window');

  return (
    <RootContainer safeArea={false}>
      <SharedElement id={`item.${room.id}.photo`}>
        <FastImage
          source={{uri: room.background}}
          style={styles.imgBg}
          resizeMode={FastImage.resizeMode.cover}
        />
      </SharedElement>
      <View style={styles.contentContainer}>
        <SafeAreaView style={styles.headerContainer}>
          <IconButton
            iconName="chevron-left"
            onPress={() => navigation.goBack()}
          />
          <BoldText style={styles.roomTitle}>{room.name}</BoldText>
          <IconButton iconName="camera" onPress={() => {}} />
        </SafeAreaView>
        <View style={styles.bodyContainer}>
          <DeviceButton />
        </View>
      </View>
    </RootContainer>
  );
}
