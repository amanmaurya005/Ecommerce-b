import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CouponProvider } from './Admin/context/CouponContext.jsx';

createRoot(document.getElementById('root')).render(
 <GoogleOAuthProvider clientId="748676464510-a17i2icalkg84degrkgnl6f05ms11ed9.apps.googleusercontent.com">
  <CouponProvider>
  <App />
  </CouponProvider>
</GoogleOAuthProvider>
)
