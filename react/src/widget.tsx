import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// css
import './index.css'

export function render(view: { el: HTMLElement }) {
  const root = createRoot(view.el)
  root.render(<App />)
  return () => root.unmount()
}
