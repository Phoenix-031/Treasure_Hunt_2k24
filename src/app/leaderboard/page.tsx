'use client';

import React, { useEffect } from 'react'

import styles from './style.module.scss';
import { useGetLeaderboard } from '@/query/api/user.service';
import FetchingLoader from '@/components/FetchingLoader/FetchingLoader';

type T_TeamDisplay = {
    teamName : string,
    teamId: string,
    currentQuestionStage: number,
    lastStageUpdate: string,
}

const LeaderBoard = () => {

  const getLeaderBoard = useGetLeaderboard();
   
  return (
    <div className={styles.main__container}>
        <div>
            <p>LEADERBOARD</p>
        </div>

        <div>
            {
                getLeaderBoard.isLoading? <FetchingLoader /> : (
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Team Name</th>
                        <th>Stage</th>
                    </tr>
                </thead>
                <tbody>
                    {getLeaderBoard.data?.body.data?.map((team: T_TeamDisplay, index : number) => (
                        <tr key={team.teamId}>
                            <td>{index + 1}</td>
                            <td>{team.teamName}</td>
                            <td>{team.currentQuestionStage}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
                )
            }
        </div>
        
    </div>
  )
}

export default LeaderBoard