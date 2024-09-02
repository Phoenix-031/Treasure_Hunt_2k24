'use client'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import styles from './style.module.scss'

import techtixImg from '@/assets/images/techtix.jpeg';
import infinitioImg from'@/assets/images/infinitio.jpeg';

import InstallPWAButton from '@/components/InstallPWAButton/InstallPWAButton'


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
            <button><Link href='/auth/login'>Lets get going</Link></button>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center flex-col gap-8 p-8 pt-0">
        <div>
          <p className='text-2xl'>Presented By</p>
        </div>
        <div className='flex justify-center items-center gap-10'>
          <div className='flex flex-col justify-center items-center'>
            <Image src={techtixImg} alt='Techtix' height={45} className='rounded-full'/>
            <p>Techtix</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <Image src={infinitioImg} alt='Infinitio' height={45} className='rounded-full' />
            <p>Infinitio</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home