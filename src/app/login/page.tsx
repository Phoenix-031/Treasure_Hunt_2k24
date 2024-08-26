'use client'

import React, { useState } from 'react'
import styles from './style.module.scss'
import { FormType } from '@/types/form.type'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

type UserLoginFormType = z.infer<typeof FormType.UserLoginForm>

const Login = () => {

   const router= useRouter()

   const {register,handleSubmit} = useForm({
    defaultValues:{
        teamName: '',
        espektroId: '',
    }
   })


  return (
    <div className={styles.main__container}>
        <form onSubmit={handleSubmit(onSubmitForm)} className={styles.user__longin__form}>
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
    console.log(data, "form data")
    router.push('/startup')
  }
}

export default Login