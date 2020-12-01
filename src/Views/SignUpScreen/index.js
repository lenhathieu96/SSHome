import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import {Formik} from 'formik';
import TextInput from '../../Components/TextInput';
import * as Yup from 'yup';

import {handleMasterSignUp} from '../../Api/userAPI';

import Text, {ErrorText} from '../../Components/Text';
import TextButton from '../../Components/TextButton';

import styles from './styles/index.css';

export default function SignUpScreen({navigation, route}) {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [homeID, sethomeID] = useState('');
  const [signupError, setSignupError] = useState('');

  const initialValues = {
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    homeID,
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
    homeID: Yup.string().required('Mã Khách hàng không được để trống'),
  });

  const onSignup = async (values) => {
    const response = await handleMasterSignUp(values);
    if (response && !response.result) {
      setSignupError(`Đăng ký không thành công, ${response.message} !`);
    }
  };

  useEffect(() => {
    if (route.params?.qrcode) {
      sethomeID(route.params.qrcode);
    }
  }, [route.params?.qrcode]);

  return (
    <KeyboardAvoidingView style={styles.root}>
      <Formik
        validationSchema={validateSchema}
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values) => onSignup(values)}>
        {({handleChange, handleSubmit, values, errors, setFieldValue}) => {
          return (
            <View style={styles.formContainer}>
              {/* Name */}
              <View style={styles.inputContainer}>
                <TextInput
                  value={values.name}
                  label="Họ và Tên"
                  style={styles.input}
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
                  onChangeText={handleChange('email')}
                />
                <ErrorText style={styles.txtError}>{errors.email}</ErrorText>
              </View>
              {/* Phone */}
              <View style={styles.inputContainer}>
                <TextInput
                  value={values.phone}
                  label="Số Điện Thoại"
                  keyboardType="number-pad"
                  style={styles.input}
                  onChangeText={handleChange('phone')}
                />
                <ErrorText style={styles.txtError}>{errors.phone}</ErrorText>
              </View>
              {/* Password */}
              <View style={styles.inputContainer}>
                <TextInput
                  secureTextEntry={showPassword ? true : false}
                  value={values.password}
                  label="Mật Khẩu"
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  iconName={showPassword ? 'eye' : 'eye-slash'}
                  onIconPress={() => setShowPassword(!showPassword)}
                />
                <ErrorText style={styles.txtError}>{errors.password}</ErrorText>
              </View>
              {/* Confirm Password */}
              <View style={styles.inputContainer}>
                <TextInput
                  secureTextEntry={showConfirmPassword ? true : false}
                  value={values.confirmPassword}
                  label="Xác Nhận Mật Khẩu"
                  style={styles.input}
                  onChangeText={handleChange('confirmPassword')}
                  iconName={showConfirmPassword ? 'eye' : 'eye-slash'}
                  onIconPress={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                />
                <ErrorText style={styles.txtError}>
                  {errors.confirmPassword}
                </ErrorText>
              </View>
              {/* homeID */}
              <View style={styles.inputContainer}>
                <TextInput
                  value={homeID}
                  label="Mã Khách Hàng"
                  style={styles.input}
                  iconName="qrcode"
                  onIconPress={() => {
                    navigation.navigate('qrcode', {
                      isFromMasterSignUp: true,
                    });
                  }}
                />
                <ErrorText style={styles.txtError}>{errors.homeID}</ErrorText>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.txtSignupError}>{signupError}</Text>
                <TextButton
                  style={styles.btnSignUp}
                  text="Đăng Ký"
                  onPress={handleSubmit}
                />
              </View>
            </View>
          );
        }}
      </Formik>
    </KeyboardAvoidingView>
  );
}
