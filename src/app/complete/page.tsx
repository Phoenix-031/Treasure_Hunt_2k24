import React from 'react'
import styles from './style.module.scss'

const HuntComplete = () => {
  return (
    <div className={styles.main__container}>
      <h1>Hunt Complete!</h1>
      <p>Congratulations on completing all the questions!</p>
    </div>
  )
}

export default HuntComplete