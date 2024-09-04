'use client'

import React, { useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'

import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook'
import { userActions } from '@/store/slices/user.slice'
import { selectTeamId, selectTeamName } from '@/store/selectors/user.selector'
import { useGetTeamById, useVerifyStartupAnswer } from '@/query/api/user.service'

import styles from './style.module.scss'

import FetchingLoader from '@/components/FetchingLoader/FetchingLoader'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import GridContainer from '@/components/GridContainer/GridContainer'


const StartUp = () => {

  const router = useRouter();
  const queryClient = useQueryClient();

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

    if(getTeam.data){
      const teamData= getTeam.data?.data;
      dispatch(userActions.setNumberOfLives(teamData.numberOfLives));
    }
  }, [getTeam.isLoading, getTeam.data, getTeam, dispatch])
    
  return (
    <GridContainer>
      <div className={styles.main__container}>
          <div className={styles.team__name}>
              <p>Pirate #{teamId}</p>
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
    </GridContainer>
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
      onSuccess: async(res) =>{

        if(res.success) {
          dispatch(userActions.setProgressString(res.body.setProgressString))
          dispatch(userActions.setCurrentQuestionNumber(res.body.currentQuestionStage));
          dispatch(userActions.setNumberOfLives(res.body.numberOfLives));
          
          router.push(`${teamId}/question/q${res.body.currentQuestionStage}`)
          toast('Use your Lives carefully!!')
          queryClient.invalidateQueries({
            queryKey:['team']
          })
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