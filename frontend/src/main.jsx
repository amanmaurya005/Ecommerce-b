import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CouponProvider } from './Admin/context/CouponContext.jsx';

createRoot(document.getElementById('root')).render(
 <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <CouponProvider>
  <App />
  </CouponProvider>
</GoogleOAuthProvider>
)
