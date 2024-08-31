'use client'

import React from 'react'
import styles from './style.module.scss'
import { useRouter } from 'next/navigation'
import { localStorageUtil } from '@/utils/localStorage.util'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook'
import { userActions } from '@/store/slices/user.slice'
import { selectTeamId, selectTeamName } from '@/store/selectors/user.selector'
import { useUpdateTeamStage } from '@/query/api/user.service'

const StartUp = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const teamName=useAppSelector(selectTeamName);
  const teamId = useAppSelector(selectTeamId);

  const updateTeamStage = useUpdateTeamStage();

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

  async function handleStartHunt() {
    // TODO : add logic that if the provided puzzle answer is correct then it would get the user to the first question and continue the game

    if(initialPuzzleAnswer === 'Secret') {

        const res = await updateTeamStage.mutateAsync({
          currentQuestionStage : 1,
        })

        if(res) {
          dispatch(userActions.setProgressString('puzzlesol_'))
          dispatch(userActions.setCurrentQuestionNumber(1));
        }

        router.push(`${teamId}/question/q1`)
    }
  }
}

export default StartUp