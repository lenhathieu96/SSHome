import React, {useState, useRef, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ScrollView,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {Formik} from 'formik';
import {TextInput} from 'react-native-paper';
import * as Yup from 'yup';

import {handleSignUp} from '../../../Api/authApi'

import Text from '../../../Components/Text';
import TextButton from '../../../Components/TextButton';

import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';
import styles from './styles/index.css';

export default function SignUpScreen({navigation, route}) {
  const headerHeight = useHeaderHeight();

  const customerIDInputRef = useRef();

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [customerID, setCustomerID] = useState('');

  const initialValues = {
    name: 'leenhahie',
    phone: '032959656',
    email: 'lenhathieu96@gmail.com',
    password: 'Nhathieu96',
    confirmPassword: 'Nhathieu96',
    customerID: 'ynxuvT4h0GBs2vr6IiOP',
  };

  const validateSchema = Yup.object().shape({
    name: Yup.string().required('Tên không được để trống'),
    phone: Yup.string()
      .required('Số điện thoại không được để trống')
      .max(11, 'Sai định dạng số điện thoại'),
    email: Yup.string()
      .required('Tên không được để trống')
      .email('Sai định dạng email'),
    password: Yup.string().required('Mật khẩu không được để trống'),
    confirmPassword: Yup.string()
      .required('Xác Nhận Mật khẩu không được để trống')
      .oneOf([Yup.ref('password'), null], 'Xác nhận mật khẩu không chính xác'),
    customerID: Yup.string().required('Mã Khách hàng không được để trống'),
  });

  useEffect(() => {
    if (route.params?.qrcode) {
      setCustomerID(route.params.qrcode);
      customerIDInputRef.current.focus();
    }
  }, [route.params?.qrcode]);

  return (
    <ScrollView>
      <KeyboardAvoidingView style={{marginTop: headerHeight, flex: 1}}>
        <Formik
          validationSchema={validateSchema}
          initialValues={initialValues}
          enableReinitialize
          onSubmit={(values) => handleSignUp(values)}>
          {({handleChange, handleSubmit, values, errors, setFieldValue}) => {
            return (
              <View style={styles.formContainer}>
                {/* Name */}
                <View style={styles.inputContainer}>
                  <TextInput
                    value={values.name}
                    label="Họ và Tên"
                    style={styles.input}
                    theme={{
                      colors: {
                        primary: Color.primary,
                        underlineColor: 'transparent',
                        background: 'transparent',
                      },
                    }}
                    onChangeText={handleChange('name')}
                  />
                  <Text style={styles.txtError}>{errors.name}</Text>
                </View>
                {/* Email */}
                <View style={styles.inputContainer}>
                  <TextInput
                    value={values.email}
                    label="Email"
                    style={styles.input}
                    theme={{
                      colors: {
                        primary: Color.primary,
                        underlineColor: 'transparent',
                        background: 'transparent',
                      },
                    }}
                    onChangeText={handleChange('email')}
                  />
                  <Text style={styles.txtError}>{errors.email}</Text>
                </View>
                {/* Phone */}
                <View style={styles.inputContainer}>
                  <TextInput
                    value={values.phone}
                    label="Số Điện Thoại"
                    style={styles.input}
                    theme={{
                      colors: {
                        primary: Color.primary,
                        underlineColor: 'transparent',
                        background: 'transparent',
                      },
                    }}
                    onChangeText={handleChange('phone')}
                  />
                  <Text style={styles.txtError}>{errors.phone}</Text>
                </View>
                {/* Password */}
                <View style={styles.inputContainer}>
                  <TextInput
                    secureTextEntry={showPassword ? true : false}
                    value={values.password}
                    label="Mật Khẩu"
                    style={styles.input}
                    theme={{
                      colors: {
                        primary: Color.primary,
                        underlineColor: 'transparent',
                        background: 'transparent',
                      },
                    }}
                    right={
                      <TextInput.Icon
                        name={showPassword ? 'eye' : 'eye-off'}
                        color={Color.primary}
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                    onChangeText={handleChange('password')}
                  />
                  <Text style={styles.txtError}>{errors.password}</Text>
                </View>
                {/* Confirm Password */}
                <View style={styles.inputContainer}>
                  <TextInput
                    secureTextEntry={showConfirmPassword ? true : false}
                    value={values.confirmPassword}
                    label="Xác Nhận Mật Khẩu"
                    style={styles.input}
                    theme={{
                      colors: {
                        primary: Color.primary,
                        underlineColor: 'transparent',
                        background: 'transparent',
                      },
                    }}
                    right={
                      <TextInput.Icon
                        name={showConfirmPassword ? 'eye' : 'eye-off'}
                        color={Color.primary}
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    }
                    onChangeText={handleChange('confirmPassword')}
                  />
                  <Text style={styles.txtError}>{errors.confirmPassword}</Text>
                </View>
                {/* CustomerID */}
                <View style={styles.inputContainer}>
                  <TextInput
                    ref={customerIDInputRef}
                    value={customerID}
                    label="Mã Khách Hàng"
                    style={styles.input}
                    theme={{
                      colors: {
                        primary: Color.primary,
                        underlineColor: 'transparent',
                        background: 'transparent',
                      },
                    }}
                    right={
                      <TextInput.Icon
                        name="qrcode"
                        color={Color.primary}
                        onPress={() => {
                          navigation.navigate('qrcode');
                        }}
                      />
                    }
                    onChangeText={handleChange('customerID')}
                    onFocus={() => {
                      if (customerID && customerID !== '') {
                        setFieldValue('customerID', customerID);
                      }
                    }}
                  />
                  <Text style={styles.txtError}>{errors.customerID}</Text>
                </View>

                <TextButton
                  style={styles.btnSignUp}
                  text="Đăng Ký"
                  onPress={handleSubmit}
                />
              </View>
            );
          }}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
