# redux-toolkit-persist

persist redux toolkit store in local storage

```js
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-toolkit-persist'

// ... normal setup, create store and persistor, import components etc.

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistConfig={persistConfig}>
        <RootComponent />
      </PersistGate>
    </Provider>
  )
}
```

## Simple example without RTK Query

```js
//store.ts

import { loadState, PersistConfig } from 'redux-toolkit-persist'

// We exclude the reducer 'api' from RTK-query
export const persistConfig: PersistConfig = {
  version: 1,
}

export const store = configureStore({
  reducer: {
    interface: interfaceReducer,
    user: userReducer,
  },
  preloadedState: loadState(persistConfig),
})
```

## Example with RTK Query

Generally, we want to avoid saving ApiSlice from RTK-query.
All the reducers that don't need to be persisted can be filled inside `excludedReducers`

```js
//store.ts

import { loadState, PersistConfig } from 'redux-toolkit-persist'

// We exclude the reducer 'api' from RTK-query
export const persistConfig: PersistConfig = {
  version: 1,
  excludedReducers: ['api'],
}

export const store = configureStore({
  reducer: {
    interface: interfaceReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  preloadedState: loadState(persistConfig),
})
```
