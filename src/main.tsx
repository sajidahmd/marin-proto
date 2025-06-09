import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
// import Home from "@/app/page.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      Hello world
    </div>
  </StrictMode>,
)
