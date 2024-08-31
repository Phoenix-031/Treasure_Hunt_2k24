'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { persistor, store } from '.'
import { ReactNode } from 'react'
import { PersistGate } from 'redux-persist/integration/react'

type StoreProviderProps = {
    children: ReactNode
}

const StoreProvider = ({children} : StoreProviderProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default StoreProvider