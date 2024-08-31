'use client'

import React, { useEffect } from 'react'

type PageType = {
    params: {
        qnnumber: string
        teamId : string
    }
}


const QuestionPage = ({params} : PageType) => {
  
  return (
    <div>QuestionPage{params.qnnumber}</div>
  )
}

export default QuestionPage