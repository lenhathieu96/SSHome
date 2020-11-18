import React from 'react';
import {View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import Text, {BoldText} from '../../../../Components/Text';
import Icon from 'react-native-vector-icons/Feather';

import Color from '../../../../Utils/Color';
import * as fontSize from '../../../../Utils/FontSize';
import styles from './styles/index.css';

export default function Weather(props) {
  const {weather} = props;
  const hardware = useSelector((state) => state.hardware);

  const translate = (input) => {
    switch (input) {
      case 'clear sky':
        return 'Quang Đãng';
      case 'few clouds':
        return 'Ít Mây';
      case 'scattered clouds':
        return 'Mây Rải Rác';
      case 'broken clouds':
        return 'Nhiều Mây';
      case 'shower rain':
        return 'Mưa Phùn';
      case 'rain':
        return 'Mưa';
      case 'thunderstorm':
        return 'Sấm Chớp';
      case 'snow':
        return 'Tuyết';
      case 'mist':
        return 'Sương Mù';
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
        <Image
          source={{
            uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
          }}
          style={styles.weatherIcon}
        />
        <Text> {translate(weather.desc)}</Text>
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
          <BoldText style={styles.txtWeather}>{26}</BoldText>
          <Text>°C</Text>
        </View>
        <Text> Trong Nhà</Text>
      </View>
    </View>
  );
}
