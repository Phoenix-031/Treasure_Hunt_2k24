'use client'

import Image from 'next/image';
import React, { useEffect } from 'react'
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook';
import { userActions } from '@/store/slices/user.slice';
import { useRouter } from 'next/navigation';
import { selectNumberOfLives, selectQrCodeValue, selectTeamId } from '@/store/selectors/user.selector';
import { useUpdateTeam } from '@/query/api/user.service';

type QuestionProps = {
    questionNumber : number
    question: string;
    imageUrl?: string;
    qrscanner?: boolean;
    code ?: string;
    location?: string;
}

const Question = (props : QuestionProps) => {

  const {questionNumber, question, imageUrl, qrscanner, code, location } = props;

  const dispatch = useAppDispatch();
  const router = useRouter();
  const teamLives = useAppSelector(selectNumberOfLives)
  const teamId = useAppSelector(selectTeamId)
  const qrCodeValue = useAppSelector(selectQrCodeValue)
  const numberOfLives = useAppSelector(selectNumberOfLives);

  const updateTeam = useUpdateTeam();

  return (
    <div className={styles.main__question__container}>

        <div>
            Lives: {teamLives}
        </div>
        
        <div>
            <p>{question}</p>

            <div>
                <Image src={imageUrl!} alt='Question' height={200} width={300} />
            </div>
        </div>

        <div>
            <p>Code: </p>
            <p>{qrCodeValue}</p>
        </div>

        <div>
            {qrscanner ? (
                qrCodeValue !== '' ? (
                    <div>
                        <button onClick={handleSubmit}>
                            Submit
                        </button>
                        <button onClick={handleCancelCode}>
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div>
                        <button onClick={handleScanQR}>Scan QR</button>
                    </div>
                )
            ) : null}
        </div>
    </div>
  )

  function handleScanQR() {
    router.push('/scan')
  }

  function handleCancelCode() {
    dispatch(userActions.setQrCodeValue(''))
  }
  
  async function handleSubmit() {

    if(teamLives === 0) {
        router.push('/dead')
    }

    if(qrCodeValue !== 'qrvalue') {
        const res = await updateTeam.mutateAsync({
            numberOfLives : numberOfLives -1 
        })
        if(res) {
            dispatch(userActions.setNumberOfLives(numberOfLives -1))
        }
    }else {
        dispatch(userActions.setProgressString(`/${teamId}/question/${questionNumber}`))

        if(questionNumber !== 6) {
            const res = await updateTeam.mutateAsync({
                currentQuestionStage : questionNumber+1,
            })
            if(res){
                dispatch(userActions.setCurrentQuestionNumber(questionNumber+1))
                router.push(`/${teamId}/question/q${questionNumber+1}`)
            }
        }else {
            router.push('/complete')
        }
    }
    dispatch(userActions.setQrCodeValue(''))
  }
}

export default Question