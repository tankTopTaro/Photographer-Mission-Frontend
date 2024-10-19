import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import ScriptLoader from './components/ScriptLoader.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ScriptLoader />
      <App />
    </Router>
  </StrictMode>,
)
