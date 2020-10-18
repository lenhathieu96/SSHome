import React from 'react';
import {Dimensions, View, Image, Animated} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles/index.css';
export default function MemberList() {
  const scrollX = new Animated.Value(0);
  const {width} = Dimensions.get('window');
  // personal card container
  const _card_width = scrollX.interpolate({
    inputRange: [0, 0.4 * width],
    outputRange: [0.4 * width, 50],
    extrapolate: 'clamp',
  });
  const _card_height = scrollX.interpolate({
    inputRange: [0, 0.4 * width],
    outputRange: [0.6 * width, 50],
    extrapolate: 'clamp',
  });
  const _card_position_top = scrollX.interpolate({
    inputRange: [0, 0.4 * width],
    outputRange: [0, (0.5 * width) / 2],
    extrapolate: 'clamp',
  });
  const _card_position_left = scrollX.interpolate({
    inputRange: [0, 0.4 * width],
    outputRange: [10, 0],
    extrapolate: 'clamp',
  });
  const _card_border_left_radius = scrollX.interpolate({
    inputRange: [0, 0.4 * width],
    outputRange: [16, 0],
    extrapolate: 'clamp',
  });

  // image container
  const _image_container_height = scrollX.interpolate({
    inputRange: [0, 0.4 * width],
    outputRange: [0.4 * width, 40],
    extrapolate: 'clamp',
  });
  const _image_container_margin = scrollX.interpolate({
    inputRange: [0, 0.4 * width],
    outputRange: [0, 4],
    extrapolate: 'clamp',
  });
  const _image_container_border_radius = scrollX.interpolate({
    inputRange: [0, 0.4 * width],
    outputRange: [0, 40],
    extrapolate: 'clamp',
  });

  // cta container
  const _cta_container_padding_top = scrollX.interpolate({
    inputRange: [0, 0.4 * width],
    outputRange: [20, -20],
    extrapolate: 'clamp',
  });
  const _cta_container_opacity = scrollX.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // icon
  const _icon_scale = scrollX.interpolate({
    inputRange: [0, 0.4 * width],
    outputRange: [1, 0.6],
    extrapolate: 'clamp',
  });
  const _icon_position_top = scrollX.interpolate({
    inputRange: [0, 0.4 * width],
    outputRange: [-15, -28],
    extrapolate: 'clamp',
  });
  const _icon_position_right = scrollX.interpolate({
    inputRange: [0, 0.4 * width],
    outputRange: [(0.3 * width) / 2, -3],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.personal_card_container,
          {
            width: _card_width,
            height: _card_height,
            top: _card_position_top,
            left: _card_position_left,
            borderTopLeftRadius: _card_border_left_radius,
            borderBottomLeftRadius: _card_border_left_radius,
          },
        ]}>
        {/* Image container */}
        <Animated.View
          style={[
            styles.image_container,
            {
              height: _image_container_height,
              margin: _image_container_margin,
              borderRadius: _image_container_border_radius,
            },
          ]}>
          <Image style={styles.image} />
        </Animated.View>
        {/* Call to action */}
        <Animated.View style={styles.cta_container}>
          <Animated.Text
            style={[
              styles.text,
              {
                paddingTop: _cta_container_padding_top,
                opacity: _cta_container_opacity,
              },
            ]}>
            Thêm Thành Viên
          </Animated.Text>
          {/* Icon */}
          <Animated.View
            style={[
              styles.icon_container,
              {
                transform: [{scale: _icon_scale}],
                top: _icon_position_top,
                right: _icon_position_right,
              },
            ]}>
            <Icon name="plus" size={18} color="#ffffff" />
          </Animated.View>
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView
        style={styles.scroll_view}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={5}
        onScroll={Animated.event([
          {
            nativeEvent: {contentOffset: {x: scrollX}},
          },
        ])}>
        <View style={styles.fake_card_ghost} />
        <View style={styles.fake_card} />
        <View style={styles.fake_card} />
        <View style={styles.fake_card} />
        <View style={styles.fake_card} />
        <View style={styles.column_spacer} />
      </Animated.ScrollView>
    </View>
  );
}
