const PERSISTED_DATA = 'rtk-persist'
const PERSISTED_CONFIG = 'rtk-persist-config'

export interface PersistConfig {
  version: number
  excludedReducers?: string[]
}

interface SavedConfig {
  version: number
}

export const loadState = (persistConfig: PersistConfig) => {
  try {
    const previousConfig: SavedConfig | null = JSON.parse(
      localStorage.getItem(PERSISTED_CONFIG) ?? 'null'
    )
    const previousVersion = previousConfig?.version

    // If the versions are not matching, return initial state status
    if (!previousVersion || persistConfig.version !== previousVersion) {
      localStorage.setItem(
        PERSISTED_CONFIG,
        JSON.stringify({
          version: persistConfig.version,
        } as SavedConfig)
      )
      return undefined
    }

    // If versions are matching, load the localStorage saved state into store
    const serializedState = localStorage.getItem(PERSISTED_DATA)
    if (!serializedState) return undefined
    return JSON.parse(serializedState)
  } catch (error) {
    return undefined
  }
}

// saveState is called on every state update
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveState = async (state: any) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(PERSISTED_DATA, serializedState)
  } catch (error) {
    //
  }
}
