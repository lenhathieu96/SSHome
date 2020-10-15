import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Text from '../../../../Components/Text';

import styles from './styles/index.css';

export default function Member(props) {
  const {User, index} = props;
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Text>{User.name}</Text>
        </View>
        <View style={styles.phoneContainer}>
          <Text style={{textAlign:'center'}}>{User.phone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
