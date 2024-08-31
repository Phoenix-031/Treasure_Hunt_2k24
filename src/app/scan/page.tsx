/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useActionState, useEffect, useState } from 'react'
import styles from './style.module.scss';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook';
import { selectCurrentQuestionNumber, selectTeamId } from '@/store/selectors/user.selector';
import { userActions } from '@/store/slices/user.slice';
import QRScanner from '@/components/QrScanner/QrScanner';

const Scan = () => {

  const router = useRouter()
  const teamId = useAppSelector(selectTeamId);
  const questionStage= useAppSelector(selectCurrentQuestionNumber)

  const dispatch = useAppDispatch()

  const [qrData, setQRData] = useState<string>('');

  const handleScan = (data: string) => {
    setQRData(data);
    navigator.clipboard.writeText(data);
    alert("code copied to clipboard")
    dispatch(userActions.setQrCodeValue(data));
    router.push(`${teamId}/question/q${questionStage}`);
  };

  // useEffect(() => {
    
  //   setTimeout(()=> {
  //       dispatch(userActions.setQrCodeValue('qrvalue'));
  //       router.push(`${teamId}/question/q${questionStage}`);
  //   }, 2000)
  // }, [])
    
  return (
    <div className={styles.main__container}>
        <QRScanner onScan={handleScan}/>
        <div>
          <p>Scanned Code :</p>
          <p>{qrData}</p>
        </div>
    </div>
  )
}

export default Scan