import React from 'react';
import {View, TouchableOpacity, Image, ImageBackground} from 'react-native';
import Text from '../../../../Components/Text';

import userBlank from '../../../../Assets/Images/userBlank.png';
import styles from './styles/index.css';

export default function Member(props) {
  const {User} = props;
  return (
    <TouchableOpacity>
      <ImageBackground source={userBlank} style={styles.fake_card}>
        <Text style={styles.txtUserName}>{User.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}
