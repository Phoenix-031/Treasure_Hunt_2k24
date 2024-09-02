'use client'

import React from 'react'
import Question from '@/components/Question/Question'
import { useGetQuestion } from '@/query/api/question.service'

import Loader from '@/components/Loader/Loader'

import styles from './style.module.scss'


type PageType = {
    params: {
        qnnumber: string
        teamId : string
    }
}


const QuestionPage = ({params} : PageType) => {

  const getsingleQuestion = useGetQuestion(`${params.qnnumber}`)

  return (
    <div className={styles.main__container}>
      {
        getsingleQuestion.isLoading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <>
            <Question question = {getsingleQuestion.data.data[0].question} imageUrl={getsingleQuestion.data.data[0].questionImage} questionNumber={Number(params.qnnumber.split('q')[1])} qrscanner={true}/>
          </>
        )
      }
    </div>
  )
}

export default QuestionPage