'use client'

import React, { useEffect } from 'react'

type PageType = {
    params: {
        qnnumber: string
    }
}


const QuestionPage = ({params} : PageType) => {

  // useEffect(() => {

  // })

  console.log(params.qnnumber, "questionno")
  
  return (
    <div>QuestionPage{params.qnnumber}</div>
  )
}

export default QuestionPage