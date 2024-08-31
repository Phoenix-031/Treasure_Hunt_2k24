'use client'

import Image from 'next/image';
import React from 'react'
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook';
import { userActions } from '@/store/slices/user.slice';
import { useRouter } from 'next/navigation';
import { selectNumberOfLives, selectTeamId } from '@/store/selectors/user.selector';
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
            <p>
                {location}
            </p>
        </div>

        <div>
            {qrscanner && <button>Scan QR</button>}
            <button className='mt-4' onClick={handleSubmit}>
                Submit
            </button>
        </div>
    </div>
  )

  async function handleSubmit() {
    dispatch(userActions.setProgressString(`/${teamId}/question/${questionNumber}`))
    if(questionNumber !== 6) {
        updatedTeamStage.mutateAsync({
            currentQuestionStage : questionNumber+1,
        })
        router.push(`/${teamId}/question/q${questionNumber+1}`)
    }else {
        router.push('/complete')
    }

  }
}

export default Question