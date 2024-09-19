import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme } from '@radix-ui/themes';

import { ApplicationViews } from './components/ApplicationViews.jsx'
import './index.css'
import '@radix-ui/themes/styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <ApplicationViews />
    </Theme>
  </StrictMode>,
)
