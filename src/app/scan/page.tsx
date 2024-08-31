/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect } from 'react'
import styles from './style.module.scss';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook';
import { selectCurrentQuestionNumber, selectTeamId } from '@/store/selectors/user.selector';
import { userActions } from '@/store/slices/user.slice';

const Scan = () => {

  const router = useRouter()
  const teamId = useAppSelector(selectTeamId);
  const questionStage= useAppSelector(selectCurrentQuestionNumber)

  const dispatch = useAppDispatch()

  useEffect(() => {
    
    setTimeout(()=> {
        dispatch(userActions.setQrCodeValue('qrvalue'));
        router.push(`${teamId}/question/q${questionStage}`);
    }, 2000)
  }, [])
    
  return (
    <div className={styles.main__container}>
        <p>Scan</p>
    </div>
  )
}

export default Scan