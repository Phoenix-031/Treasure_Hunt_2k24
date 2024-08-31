'use client'

import Image from 'next/image';
import React, { useState } from 'react'
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook';
import { userActions } from '@/store/slices/user.slice';
import { useRouter } from 'next/navigation';
import { selectCurrentQuestionNumber, selectNumberOfLives, selectQrCodeValue, selectTeamId } from '@/store/selectors/user.selector';
import { useUpdateTeamStage } from '@/query/api/user.service';

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

  const updatedTeamStage = useUpdateTeamStage();

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
    dispatch(userActions.setProgressString(`/${teamId}/question/${questionNumber}`))
    dispatch(userActions.setQrCodeValue(''))

    if(questionNumber !== 6) {
        const res = await updatedTeamStage.mutateAsync({
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
}

export default Question