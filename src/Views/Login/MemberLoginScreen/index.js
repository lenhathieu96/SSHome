import React, {useRef, useEffect} from 'react';
import {useHeaderHeight} from '@react-navigation/stack';
import {TextInput} from 'react-native-paper';
import TextButton from '../../../Components/TextButton';
import RootContainer from '../../../Components/RootContainer';

export default function MemberLoginScreen() {
  const headerHeight = useHeaderHeight();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <RootContainer safeArea={true} style={{marginTop: headerHeight}}>
      <TextInput ref={inputRef} textContentType="telephoneNumber" />
      <TextButton text="Đăng Nhập" />
    </RootContainer>
  );
}
