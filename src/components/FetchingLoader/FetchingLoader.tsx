import React from 'react'
import { PuffLoader } from 'react-spinners'

import styles from './style.module.scss';

const FetchingLoader = () => {
  return (
    <div className={styles.main__container}>
        <PuffLoader color='#000' />
    </div>
  )
}

export default FetchingLoader;