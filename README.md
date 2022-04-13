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

Inside store.ts file:

```js
export const persistConfig: PersistConfig = {
  version: 1,
  excludedReducers: ['api'],
}

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  preloadedState: loadState(persistConfig),
})
```
