'use client'

import React from 'react'
import styles from './style.module.scss'
import { useRouter } from 'next/navigation'

const StartUp = () => {

  const router = useRouter()

  const [teamName, setTeamName] = React.useState<string>('Test Team');
  const [initialPuzzleAnswer, setIntialPuzzleAnswer] = React.useState<string>('');
    
  return (
    <div className={styles.main__container}>
        <div className={styles.team__name}>
            <p>Pirate #</p>
            <p className={styles.name}>{teamName}</p>
        </div>

        <div>
            <div className={styles.start__event}>
                <p>Answer the puzzle and have fun!!</p>
            </div>
        
            <div className={styles.answer__container}>
                <input type="text" placeholder="We r rooting for U" value={initialPuzzleAnswer} onChange={(e) => setIntialPuzzleAnswer(e.target.value) }/>
                <button onClick={handleStartHunt}>Start Hunt</button>
            </div>
        </div>
    </div>
  )

  function handleStartHunt() {
    // TODO : add logic that if the provided puzzle answer is correct then it would get the user to the first question and continue the game

    router.push('/question/1')
  }
}

export default StartUp