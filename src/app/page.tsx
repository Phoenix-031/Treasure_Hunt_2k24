'use client'
import React from 'react'
import Image from 'next/image';

import styles from './style.module.scss'

import techtixImg from '@/assets/images/techtix.jpeg';
import infinitioImg from'@/assets/images/infinitio.jpeg';

import InstallPWAButton from '@/components/InstallPWAButton/InstallPWAButton'
import { useAppSelector } from '@/hooks/redux.hook';
import { selectTeamId } from '@/store/selectors/user.selector';
import { useGetTeamById } from '@/query/api/user.service';
import { useRouter } from 'next/navigation';
import FetchingLoader from '@/components/FetchingLoader/FetchingLoader';


const Home = () => {

  const router = useRouter();
  const teamId = useAppSelector(selectTeamId);
  const getTeam = useGetTeamById(teamId);

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
            {
              getTeam.isLoading ? <FetchingLoader  /> : (<button onClick={startGame}>Lets get going</button>)
            }
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

async function startGame() {
  const { data, isSuccess } = await getTeam.refetch();

  if (isSuccess && data) {
    console.log(data);

    const teamData = data.data;

    if (teamData.currentQuestionStage === 0) {
      router.push('/startup');
    } else if (teamData.currentQuestionStage === -1) {
      router.push('/complete');
    }else if(teamData.isDisqualified || teamData.numberOfLives === -1){
      router.push('/dead');
    }else {
      router.push(`/${teamId}/question/q${teamData.currentQuestionStage}`);
    }
  }
}

}

export default Home