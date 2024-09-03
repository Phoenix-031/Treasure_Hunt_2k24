'use client'

import React, { useActionState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook';
import { userActions } from '@/store/slices/user.slice';
import { selectNumberOfLives, selectQrCodeValue, selectTeamId } from '@/store/selectors/user.selector';
import { useGetTeamById, useVerifyAnswer } from '@/query/api/user.service';

import styles from './style.module.scss';

import { handleZodError } from '@/error/handleZodError';
import { useQueryClient } from '@tanstack/react-query';

type QuestionProps = {
    questionNumber : number
    question: string;
    imageUrl?: string;
    qrscanner?: boolean;
    code ?: string;
    location?: string;
}

const Question = (props : QuestionProps) => {

  const {questionNumber, question, imageUrl, qrscanner } = props;

  const queryClient = useQueryClient()
  const dispatch = useAppDispatch();
  const router = useRouter();
  const teamLives = useAppSelector(selectNumberOfLives)
  const teamId = useAppSelector(selectTeamId)
  const qrCodeValue = useAppSelector(selectQrCodeValue)

  const verifyAnswer = useVerifyAnswer();

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

    await verifyAnswer.mutateAsync({
        teamId : teamId,
        questionId : `q${questionNumber}`,
        answerCode : qrCodeValue
    },
     {
        onSuccess: async(res) =>{
            if(!res.success){
                res.zodErrorBody ? handleZodError(res.zodErrorBody) : (
                    toast.error(res.message)
                )
            dispatch(userActions.setNumberOfLives(res.body.numberOfLives));
            }else{
                if(res.body.currentQuestionStage === -1) {
                    toast.success('Congrats! The hunt is complete')
                    router.push('/complete')
                }else {
                    router.push(`/${teamId}/question/q${res.body.currentQuestionStage}`)
                }
                dispatch(userActions.setNumberOfLives(res.body.numberOfLives));
                dispatch(userActions.setCurrentQuestionNumber(res.body.currentQuestionStage));
            }
            queryClient.invalidateQueries({
                queryKey: ['team']
            })
        },
        onError: (err) => {
            console.log(err.message)
        }
    })
    dispatch(userActions.setQrCodeValue(''))
  }
}

export default Question