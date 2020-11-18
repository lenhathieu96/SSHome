import React from 'react';
import {View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import Text, {BoldText} from '../../../../Components/Text';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Color from '../../../../Utils/Color';
import * as fontSize from '../../../../Utils/FontSize';
import styles from './styles/index.css';

export default function Weather(props) {
  const {weather} = props;
  const hardware = useSelector((state) => state.hardware);

  const translate = (input) => {
    switch (input) {
      case 'Clear':
        return 'Quang Đãng';
      case 'Clouds':
        switch (weather.desc) {
          case 'few clouds':
            return 'Ít Mây';
          case 'scattered clouds':
            return 'Mây Rải Rác';
          case 'broken clouds':
            return 'Nhiều Mây';
        }
        break;
      case 'Rain':
        return 'Mưa';
      case 'Thunderstorm':
        return 'Sấm Chớp';
      case 'Snow':
        return 'Tuyết';
      case 'Mist':
        return 'Sương Mù';
      default:
        break;
    }
  };

  const setIconName = (input) => {
    switch (input) {
      case 'Clear':
        return 'circle';
      case 'Clouds':
        return 'cloud';
      case 'Rain':
        return 'cloud-rain';
      case 'Thunderstorm':
        return 'bolt';
      case 'Snow':
        return 'Tuyết';
      case 'Mist':
        return 'smog';
      default:
        break;
    }
  };

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
        <Icon name={setIconName(weather.main)} size={fontSize.bigger} />
        <Text> {translate(weather.main)}</Text>
      </View>
      <View style={styles.weatherContainer}>
        <View style={styles.txtWeatherContainer}>
          <BoldText style={styles.txtWeather}>
            {Math.round(weather.temp - 273.15)}
          </BoldText>
          <Text>°C</Text>
        </View>
        <Text> Ngoài Trời</Text>
      </View>
      <View style={styles.weatherContainer}>
        <View style={styles.txtWeatherContainer}>
          <BoldText style={styles.txtWeather}>{weather.indoorTemp}</BoldText>
          <Text>°C</Text>
        </View>
        <Text> Trong Nhà</Text>
      </View>
    </View>
  );
}
