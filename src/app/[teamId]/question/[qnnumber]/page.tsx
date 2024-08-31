'use client'

import Loader from '@/components/Loader/Loader'
import { useGetQuestion } from '@/query/api/question.service'
import React from 'react'
import styles from './style.module.scss'
import Question from '@/components/Question/Question'

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
            <Question question = {getsingleQuestion.data.data[0].question} imageUrl={getsingleQuestion.data.data[0].questionImage} questionNumber={Number(params.qnnumber.split('q')[1])}/>
          </>
        )
      }
    </div>
  )
}

export default QuestionPage