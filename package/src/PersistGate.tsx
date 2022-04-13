import React, { ReactNode, useEffect, useState } from 'react'
import { PersistConfig, saveState } from './utils'

interface Props {
  children: ReactNode
  persistConfig: PersistConfig
  store: any
}

export const PersistGate = ({ children, persistConfig, store }: Props) => {
  const [isFirstRender, setIsFirstRender] = useState(false)

  useEffect(() => {
    setIsFirstRender(true)
    const excludedReducers = persistConfig?.excludedReducers || []

    store.subscribe(() => {
      const stateToSave = excludedReducers.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc: any, key) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [key]: removed, ...rest } = acc
          return rest
        },
        store.getState()
      )

      saveState(stateToSave)
    })
  }, [persistConfig, store])

  // Ensure correct hydratation of components
  if (!isFirstRender) return null

  return <>{children}</>
}
