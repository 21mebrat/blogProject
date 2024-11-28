import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './RTK Query/App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ContextProvider from './context/ContextProvider.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import { Provider } from 'react-redux'
// import { store } from './redux-toolkit/store.js'
import { fetchUsers } from './redux-toolkit/userSlice.js'
import { fetchposts } from './redux-toolkit/slice.js'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import apiSlice from './RTK Query/fetuares/api/apiSlice.js'
import { store } from './login/features/api/store.js'
// import App from './login/App.jsx'
// store.dispatch(fetchUsers())
// store.dispatch(fetchposts())
createRoot(document.getElementById('root')).render(
  <StrictMode>
{/* <Provider store={store}>
  <BrowserRouter>
  <App />
  </BrowserRouter>
</Provider> */}


    <ApiProvider api={apiSlice}>

    <App />
    </ApiProvider>
    {/* <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider> */}

    {/*   
    <BrowserRouter future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }} >
      <AuthProvider >

        <ContextProvider>
          <App />
        </ContextProvider>
      </AuthProvider>
    </BrowserRouter> */}
  </StrictMode>,
)
