import React from 'react'
import styles from './style.module.scss'
import Link from 'next/link'

const HuntComplete = () => {
  return (
    <div className={styles.main__container}>
      <h1>Hunt Complete!</h1>
      <p>Congratulations on completing all the questions!</p>
      <div>
        <Link href={'/leaderboard'}>
          <button className={styles.button__general}>LeaderBoard</button>
        </Link>
      </div>
    </div>
  )
}

export default HuntComplete