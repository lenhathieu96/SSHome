import React, {useState, useRef} from 'react';
import {ImageBackground} from 'react-native';

import TextButton from '../../../Components/TextButton';

import IntroBackground from '../../../Assets/Images/introBackground.jpeg';
export default function LoginScreen() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <ImageBackground source={IntroBackground} style={{flex: 1}}>
      <TextButton text="Master Login" />
      <TextButton text="Member Login" />
    </ImageBackground>
  );
}
