import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import Text, {BoldText} from '../../../../Components/Text';
import Icon from 'react-native-vector-icons/Feather';

import Color from '../../../../Utils/Color';
import * as fontSize from '../../../../Utils/FontSize';
import styles from './styles/index.css';

export default function Weather() {
  const hardware = useSelector((state) => state.hardware);

  return !hardware.WFEnabled ? (
    <View style={styles.iconContainer}>
      <Icon
        name="wifi-off"
        size={fontSize.biggest}
        color={Color.background}
        style={{alignSelf: 'center'}}
      />
      <Text style={styles.txtInfo}>Không có kết nối Internet</Text>
    </View>
  ) : (
    <View style={styles.infoContainer}>
      <View style={styles.weatherContainer}>
        <Icon
          name="cloud-drizzle"
          size={fontSize.bigger}
          color={Color.primary}
          style={{alignSelf: 'center'}}
        />
        <Text> Mưa</Text>
      </View>
      <View style={styles.weatherContainer}>
        <View style={styles.txtWeatherContainer}>
          <BoldText style={styles.txtWeather}>{32}</BoldText>
          <Text>°C</Text>
        </View>
        <Text> Ngoài Trời</Text>
      </View>
      <View style={styles.weatherContainer}>
        <View style={styles.txtWeatherContainer}>
          <BoldText style={styles.txtWeather}>{26}</BoldText>
          <Text>°C</Text>
        </View>
        <Text> Trong Nhà</Text>
      </View>
    </View>
  );
}
