import React from 'react'
import styles from './style.module.scss';

const LivesOut = () => {
  return (
    <div className={styles.main__container}>
        <div className={styles.lives__out}>
            <p>Sorry!! You are out of lives</p>
            <p>Try again next time</p>
        </div>
    </div>
  )
}

export default LivesOut