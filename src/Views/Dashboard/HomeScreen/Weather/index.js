import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import Text, {BoldText} from '../../../../Components/Text';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FAIcon from 'react-native-vector-icons/Feather';
import {
  PlaceholderMedia,
  PlaceholderLine,
} from '../../../../Components/PlaceHolder';

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
          default:
            return 'Mây';
        }
      case 'Rain':
        switch (weather.desc) {
          case 'moderate rain':
            return 'Mưa Vừa';
          case 'light rain':
            return 'Mưa Nhỏ';
          case 'shower rain':
            return 'Mưa Phùn';
          default:
            return 'Mưa Lớn';
        }
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
        if (
          weather.desc === 'light rain' ||
          weather.desc === 'moderate rain' ||
          weather.desc === 'shower rain'
        ) {
          return 'cloud-rain';
        } else {
          return 'cloud-showers-heavy';
        }
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

  const renderPlaceHolder = () => {
    let array = [0, 1, 2];
    return (
      <View style={styles.infoContainer}>
        {array.map((item, index) => (
          <View style={styles.weatherContainer} key={index.toString()}>
            <PlaceholderMedia style={styles.placeHolderMedia} />
            <PlaceholderLine style={styles.placeHolderLine} />
          </View>
        ))}
      </View>
    );
  };

  const renderData = () => (
    <View style={styles.infoContainer}>
      <View style={styles.weatherContainer}>
        <Icon
          name={setIconName(weather.main)}
          size={fontSize.bigger}
          color={Color.blue}
        />
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

  return !hardware.WFEnabled ? (
    <View style={styles.iconContainer}>
      <FAIcon
        name="wifi-off"
        size={fontSize.biggest}
        color={Color.background}
        style={{alignSelf: 'center'}}
      />
      <Text style={styles.txtInfo}>Không có kết nối Internet</Text>
    </View>
  ) : Object.keys(weather).length > 0 ? (
    renderData()
  ) : (
    renderPlaceHolder()
  );
}
