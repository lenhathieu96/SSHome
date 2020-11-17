import React from 'react';
import {Placeholder, PlaceholderMedia, Shine} from 'rn-placeholder';
import styles from './styles/index.css';
export default function LoadingRoom() {
  return (
    <Placeholder Animation={Shine}>
      <PlaceholderMedia style={styles.container} />
    </Placeholder>
  );
}
