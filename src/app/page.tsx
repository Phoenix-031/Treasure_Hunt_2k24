'use client'

import InstallPWAButton from '@/components/InstallPWAButton/InstallPWAButton'
import React from 'react'
import styles from './style.module.scss'
import Image from 'next/image';

import techtixImg from '@/assets/images/techtix.jpeg';
import infinitioImg from'@/assets/images/infinitio.jpeg';

const Home = () => {
  return (
    <div className={styles.main__container}>
      <div className='flex justify-center items-center'>
        <InstallPWAButton />
      </div>
      <div>
        <div>
          <p>ESPEKTRO</p>
        </div>
        <div>
          <div>
            <p>Lets get going</p>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center flex-col gap-8 p-8 pt-0">
        <div>
          <p className='text-2xl'>Presented By</p>
        </div>
        <div className='flex justify-center items-center gap-10'>
          <div className='flex flex-col justify-center items-center'>
            <Image src={techtixImg} alt='Techtix' height={45} width={45} className='rounded-full'/>
            <p>Techtix</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <Image src={infinitioImg} alt='Infinitio' height={45} width={45} className='rounded-full' />
            <p>Infinitio</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home