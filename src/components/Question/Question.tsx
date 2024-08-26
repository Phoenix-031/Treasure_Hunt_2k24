import Image from 'next/image';
import React from 'react'
import styles from './style.module.scss';

type QuestionProps = {
    question: string;
    imageUrl?: string;
    qrscanner?: boolean;
    code ?: string;
    location?: string;
}

const Question = (props : QuestionProps) => {

  const { question, imageUrl, qrscanner, code, location } = props;
    
  return (
    <div className={styles.main__question__container}>

        <div>
            Lives: 5
        </div>
        
        <div>
            <p>Sample question to be given on the screen choosing a big question length just in case</p>

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
        </div>
    </div>
  )
}

export default Question