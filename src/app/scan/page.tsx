/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useState } from 'react'
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
      {qrData && <p>Scanned QR Code Data: {qrData}</p>}
    </div>
  )
}

export default Scan