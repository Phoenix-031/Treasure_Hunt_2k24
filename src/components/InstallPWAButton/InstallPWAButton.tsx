'use client';

import React, { useEffect, useState } from 'react'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

const InstallPWAButton = () => {

  const  [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e : Event) => {
        e.preventDefault()

        setPrompt(e as BeforeInstallPromptEvent)

        if(!window.matchMedia('(display-mode: standalone)').matches) {
            console.log('The app is not installed')
        }
    })
  }, [])
    
  return (
    <div className='border-[1px] border-gray-400 max-w-max rounded-lg'>
        <button className='p-2' onClick={handleClick}>
            Install App
        </button>
    </div>
  )

  function handleClick() {
    if(prompt) {
        prompt.prompt()
    }
  }
}

export default InstallPWAButton