import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LavaAnimation } from './components/LavaAnimation.jsx'
//import './components/Formulario.jsx';
import'./components/LavaAnimation.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LavaAnimation />
  </StrictMode>,
)
