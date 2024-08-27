'use client'

import React from 'react'
import styles from './style.module.scss'
import Question from '@/components/Question/Question'
import { useAppDispatch } from '@/hooks/redux.hook'
import { store } from '@/store'

const Question1 = () => {

  const dispatch = useAppDispatch();

  return (
    <div className={styles.main__container}>
        <Question 
          questionNumber={1}
          question="What is the capital of France?"
          imageUrl='https://media.istockphoto.com/id/1201904493/photo/the-bandra-worli-sea-link-shot-at-dusk-in-mumbai-a-famous-landmark-that-connects-the-city.jpg?s=2048x2048&w=is&k=20&c=zn5imEDuQ7CfkEiKfHTCh8r2aQmTV2vWmrCj6adq3BQ='
          qrscanner={true}
          location='This is some location'
          />
    </div>
  )
}

export default Question1