import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/app/App.tsx'
// Import the precompiled CSS layout styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the full JavaScript bundle (includes Popper.js for dropdowns/tooltips)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
