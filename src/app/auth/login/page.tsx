'use client'

import React from 'react'
import styles from './style.module.scss'
import { FormType } from '@/types/form.type'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook'
import { userActions } from '@/store/slices/user.slice'
import { selectTeamName } from '@/store/selectors/user.selector'
import { useLoginTeam } from '@/query/api/auth.service'
import FetchingLoader from '@/components/FetchingLoader/FetchingLoader'
import Input from '@/components/Input/Input'

type UserLoginFormType = z.infer<typeof FormType.UserLoginForm>

const Login = () => {

   const router= useRouter();
   const dispatch = useAppDispatch();
   const teamName = useAppSelector(selectTeamName)
   const loginTeam = useLoginTeam();


   const {register,handleSubmit} = useForm({
    defaultValues:{
        teamId: '',
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
                    <label htmlFor="">EspektroId</label>
                    <input {...register('espektroId',{
                        required:'Please enter your espektro id'
                    })}/>
                </div>
                {loginTeam.isPending? <FetchingLoader/> : (<button type='submit'>Lets go!!</button>)}
            </form>
                
            <div className='fixed bottom-0 p-8'>
            <p className='text-lg mb-[1rem]'>Didnt register yet?? Dont miss out on the fun</p>
            <button className={styles.button__general}>Register Now!!</button>
            </div>
        </div>
  )

  async function onSubmitForm(data : UserLoginFormType) {
  
    await loginTeam.mutateAsync(data, {
        onSuccess: (res) => {
            if(res.success) {

                if(res.body.currentQuestionStage === 0) {
                    router.push('/startup');
                }else if(res.body.currentQuestionStage === -1) {
                    router.push('/complete');
                }else {
                    router.push(`/${res.body.teamId}/question/q${res.body.currentQuestionStage}`);
                }

                dispatch(userActions.setTeamId(res.body.teamId));
                dispatch(userActions.setTeamName(res.body.teamName));
                dispatch(userActions.setNumberOfLives(res.body.numberOfLives));
            }
        },
        onError: (err) => {
            console.log(err)
        }
    }); 
  }
}

export default Login