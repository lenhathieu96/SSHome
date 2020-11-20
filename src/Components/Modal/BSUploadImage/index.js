import React from 'react';
import {View, Dimensions, ActivityIndicator} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';

import {BoldText} from '../../Text';
import TextButton from '../../TextButton';
import BottomSheet from '../BottomSheet';

import Color from '../../../Utils/Color';
import * as fontSize from '../../../Utils/FontSize';
import styles from './styles/index.css';

const BSUploadImage = React.forwardRef((props, ref) => {
  const {width, height} = Dimensions.get('window');
  const {uploadImage, isLoading} = props;
  const option = {
    mediaType: 'photo',
    quality: 1.0,
    maxWidth: width,
    maxHeight: height,
  };

  return (
    <BottomSheet
      modalHeight={0.3 * height}
      swipeable={true}
      ref={ref}
      renderContent={() =>
        isLoading ? (
          <View>
            <ActivityIndicator
              color={Color.primary}
              size={fontSize.biggest}
              style={styles.indicator}
            />
            <BoldText style={styles.loadingTitle}>
              Đang Cập Nhập Dữ Liệu, Vui Lòng Đợi ...
            </BoldText>
          </View>
        ) : (
          <View>
            <TextButton
              text="Chụp ảnh"
              style={styles.btn}
              textStyle={styles.txt}
              onPress={() =>
                ImagePicker.launchCamera(option, (res) => {
                  if (res.error) {
                    console.log(res.error);
                  } else if (res.uri) {
                    uploadImage(res.uri);
                  }
                })
              }
            />
            <TextButton
              text="Chọn ảnh từ thư viện"
              style={styles.btn}
              textStyle={styles.txt}
              onPress={() =>
                ImagePicker.launchImageLibrary(option, (res) => {
                  if (res.error) {
                    console.log(res.error);
                  } else if (res.uri) {
                    uploadImage(res.uri);
                  }
                })
              }
            />
            <TextButton
              text="Hủy"
              style={[styles.btnCancel]}
              textStyle={styles.txtBtnCancel}
              onPress={() => ref.current.close()}
            />
          </View>
        )
      }
    />
  );
});

export default BSUploadImage;
BSUploadImage.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
