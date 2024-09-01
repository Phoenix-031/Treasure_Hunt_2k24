'use client'

import Image from 'next/image';
import React from 'react'
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook';
import { userActions } from '@/store/slices/user.slice';
import { useRouter } from 'next/navigation';
import { selectNumberOfLives, selectQrCodeValue, selectTeamId } from '@/store/selectors/user.selector';
import { useGetTeamById, useUpdateTeam, useVerifyAnswer } from '@/query/api/user.service';

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
  const verifyAnswer = useVerifyAnswer();
  const getTeam = useGetTeamById(teamId, false);

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
    router.push('/scan');
  }

  function handleCancelCode() {
    dispatch(userActions.setQrCodeValue(''))
  }
  
  async function handleSubmit() {

    const res =await verifyAnswer.mutateAsync({
        teamId : teamId,
        questionId : `q${questionNumber}`,
        answerCode : qrCodeValue
    })

    if(teamLives === 0) {
        router.push('/dead')
    }

    if(!res.success) {
        const res = await getTeam.refetch();

        if(res.isSuccess) {
            const teamData= res.data.data;
            dispatch(userActions.setNumberOfLives(teamData.numberOfLives));
        }
    }
    else {
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