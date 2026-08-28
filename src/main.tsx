import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/maitree/400.css'
import '@fontsource/maitree/700.css'
import '@fontsource/bitter/600.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
