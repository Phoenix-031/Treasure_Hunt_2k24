'use client'

import React, { useLayoutEffect, useState } from 'react'
import styles from './style.module.scss'
import { FormType } from '@/types/form.type'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook'
import { userActions } from '@/store/slices/user.slice'
import { selectTeamName } from '@/store/selectors/user.selector'
import { useGetTeamById } from '@/query/api/user.service'

type UserLoginFormType = z.infer<typeof FormType.UserLoginForm>

const Login = () => {

   const router= useRouter();
   const dispatch = useAppDispatch();
   const teamName = useAppSelector(selectTeamName)

  //  const [teamId, setTeamId] = useState('')

  //  const getTeam = useGetTeamById(teamId);

   const {register,handleSubmit} = useForm({
    defaultValues:{
        teamId: '',
        teamName: '',
        espektroId: '',
    }
   })


  return (
    <div className={styles.main__container}>
        <form onSubmit={handleSubmit(onSubmitForm)} className={styles.user__longin__form}>
            <div>
               <label htmlFor="">TeamId</label>
                <input {...register('teamId',{
                    required:'Please enter the team id to continue'
                })}/>
            </div>
            <div>
                <label htmlFor="">TeamName</label>
                <input {...register('teamName',{
                    required:'Please enter the team name to continue'
                })}/>
            </div>
            
            <div>
                <label htmlFor="">EspektroId</label>
                <input {...register('espektroId',{
                    required:'Please enter your espektro id'
                })}/>
            </div>
            <button type='submit'>Lets go!!</button>
        </form>
            
        <div className='fixed bottom-0 p-8'>
          <p className='text-lg mb-[1rem]'>Didnt register yet?? Dont miss out on the fun</p>
          <button className={styles.button__general}>Register Now!!</button>
        </div>
    </div>
  )

  async function onSubmitForm(data : UserLoginFormType) {
  
    dispatch(userActions.setTeamId('team456'))
    dispatch(userActions.setTeamName("spmeTeamName"))
    router.push('/startup')
  }
}

export default Login