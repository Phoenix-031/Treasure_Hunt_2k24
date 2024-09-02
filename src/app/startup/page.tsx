'use client'

import React, { useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'

import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook'
import { userActions } from '@/store/slices/user.slice'
import { selectTeamId, selectTeamName } from '@/store/selectors/user.selector'
import { useGetTeamById, useVerifyStartupAnswer } from '@/query/api/user.service'

import styles from './style.module.scss'

import { NumberOfLives } from '@/constants/constant'
import FetchingLoader from '@/components/FetchingLoader/FetchingLoader'
import { toast } from 'sonner'


const StartUp = () => {

  const router = useRouter();

  const dispatch = useAppDispatch();
  const teamName=useAppSelector(selectTeamName);
  const teamId = useAppSelector(selectTeamId);

  const getTeam = useGetTeamById(teamId);
  const verifyStartupAnswer = useVerifyStartupAnswer();

  const [initialPuzzleAnswer, setIntialPuzzleAnswer] = React.useState<string>('');

  useEffect(() => {
    getTeam.refetch();
    if(!getTeam.isLoading && getTeam.data){
      if(getTeam.data.data.isDisqualified) redirect('/dead')
    }
  }, [getTeam.isLoading, getTeam.data, getTeam])

    
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
                {
                  verifyStartupAnswer.isPending ? <FetchingLoader /> : (
                    <button onClick={handleStartHunt}>Start Hunt</button>
                  )
                }
            </div>
        </div>
    </div>
  )

  async function handleStartHunt() {

    if(initialPuzzleAnswer.length === 0) {
      toast.info('Field cannot be empty');
      return;
    }

    await verifyStartupAnswer.mutateAsync({
      teamId : teamId,
      answer: initialPuzzleAnswer,
    },{
      onSuccess: (res) =>{
        if(res.success) {
          dispatch(userActions.setProgressString('puzzlesol_'))
          dispatch(userActions.setCurrentQuestionNumber(1));
          dispatch(userActions.setNumberOfLives(NumberOfLives));
          router.push(`${teamId}/question/q1`)
        }else {
          toast.info('Try again!!')
          setIntialPuzzleAnswer('')
        }
      },
      onError:() => {
        toast.error('Something went wrong!!')
        setIntialPuzzleAnswer('')
      }
    })
  }
}

export default StartUp