'use client'

import React, { useLayoutEffect } from 'react'
import styles from './style.module.scss'
import Question from '@/components/Question/Question'
import { withAuth } from '@/wrapper/AuthWrapper'
import { useRouter } from 'next/navigation'
import { redirect, usePathname } from 'next/navigation'
import { useAppSelector } from '@/hooks/redux.hook'
import { selectCurrentQuestionNumber, selectProgressString } from '@/store/selectors/user.selector'

const Question2 = () => {

    const progressString = useAppSelector(selectProgressString)
    const currentQuestionNumber= useAppSelector(selectCurrentQuestionNumber);
    const router = useRouter()
    const pathname = usePathname();

    const questionNumber= Number(pathname.split('/')[2].split('q')[1])
    const progress = progressString.split('_').length -2

    useLayoutEffect(() => {
      if (progress!== questionNumber) {
        redirect(`/question/q${currentQuestionNumber}`);
      }
    }, [])
  
  return (
    <div className={styles.main__container}>
        <Question 
          questionNumber={2}
          question="This is quesiton number 2"
          imageUrl='https://media.istockphoto.com/id/1201904493/photo/the-bandra-worli-sea-link-shot-at-dusk-in-mumbai-a-famous-landmark-that-connects-the-city.jpg?s=2048x2048&w=is&k=20&c=zn5imEDuQ7CfkEiKfHTCh8r2aQmTV2vWmrCj6adq3BQ='
          qrscanner={true}
          location='This is some location'
          />
    </div>
  )
}

export default Question2;