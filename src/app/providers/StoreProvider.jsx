import React from 'react'
import { store } from 'app/redux/store'
import { Provider } from 'react-redux'

export const StoreProvider = ({children}) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}
