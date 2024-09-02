'use client'

import React, { useActionState, useEffect, useState } from 'react'
import styles from './style.module.scss';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook';
import { selectCurrentQuestionNumber, selectTeamId } from '@/store/selectors/user.selector';
import { userActions } from '@/store/slices/user.slice';
import QRScanner from '@/components/QrScanner/QrScanner';
import { toast } from 'sonner';
import { z } from 'zod';

const dataValidator = z.string().min(7)

const Scan = () => {

  const router = useRouter()
  const teamId = useAppSelector(selectTeamId);
  const questionStage= useAppSelector(selectCurrentQuestionNumber)

  const dispatch = useAppDispatch()

  const [qrData, setQRData] = useState<string>('');

  const handleScan = (data: string) => {
    setQRData(data);

    const dataValidated = dataValidator.safeParse(data);

    if(data && dataValidated.success)
    navigator.clipboard.writeText(data);
    toast.success('Copied to clipboard',{
      duration: 1200
    });
    dispatch(userActions.setQrCodeValue(data));
    router.push(`${teamId}/question/q${questionStage}`);
    return;
  };
    
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