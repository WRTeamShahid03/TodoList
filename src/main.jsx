import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store.jsx';
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <App />
    </PersistGate>
  </Provider>
)
