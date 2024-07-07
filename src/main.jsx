import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import "bootstrap-icons/font/bootstrap-icons.css";


import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContextProvider } from './components/web/context/User.jsx'
import { Provider } from 'react-redux';
import store from './redux/store.jsx'

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ToastContainer/>
      <UserContextProvider>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <App />
            </Provider>   
          </QueryClientProvider>
      </UserContextProvider>
  </>,
)
