import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/lib/integration/react.js';
import { Provider } from "react-redux";
import Store, { persistor } from './redux/store.js';

// Automatically unregister service workers in development mode to prevent caching conflicts
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister().then((success) => {
        if (success) {
          console.log("Dev Helper: Active Service Worker unregistered to clear cache.");
          window.location.reload(); // Reload to fetch fresh dev assets
        }
      });
    }
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <Provider store={Store}>
       <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
  </StrictMode>,
)

