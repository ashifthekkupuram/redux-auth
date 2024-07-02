import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './main.css'
import App from './App'
import { store } from './app/store'

const root = document.getElementById('root')
ReactDOM.createRoot(root).render(
    <React.StrictMode >
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
