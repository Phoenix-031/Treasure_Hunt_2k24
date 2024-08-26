import React from 'react'

type QuestionProps = {
    question: string;
    imageUrl?: string;
    qrscanner?: boolean;
    code ?: string;
    location?: string;
}

const Quetion = (props : QuestionProps) => {
  return (
    <div>Quetion</div>
  )
}

export default Quetion