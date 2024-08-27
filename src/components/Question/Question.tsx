'use client'

import Image from 'next/image';
import React from 'react'
import styles from './style.module.scss';
import { useAppDispatch } from '@/hooks/redux.hook';
import { userActions } from '@/store/slices/user.slice';
import { useRouter } from 'next/navigation';

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
  const router = useRouter()
    
  return (
    <div className={styles.main__question__container}>

        <div>
            Lives: 5
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

  function handleSubmit() {
    // TODO write the logic to say if the answer is correct or not then continue
    dispatch(userActions.setProgressString(`question${questionNumber}`))
    if(questionNumber !== 6) {
        router.push(`/question/q${questionNumber+1}`)
    }else {
        router.push('/complete')
    }

  }
}

export default Question