import React from 'react'
import ReactDOM from 'react-dom/client'


import 'bootstrap-icons/font/bootstrap-icons.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/globals.css'

import AppRouter from './AppRouter'
import Header from './components/Headers'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header />

    <main className="container pt-4">
      <AppRouter />
    </main>
  </React.StrictMode>,
)
