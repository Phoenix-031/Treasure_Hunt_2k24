'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { store } from '.'
import { ReactNode } from 'react'

type StoreProviderProps = {
    children: ReactNode
}

const StoreProvider = ({children} : StoreProviderProps) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default StoreProvider