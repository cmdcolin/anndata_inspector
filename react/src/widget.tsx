import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// css
import './index.css'

function render({
  el,
  experimental,
}: {
  el: HTMLElement
  experimental: {
    invoke: (arg: string, arg2: unknown) => Promise<[arg: string]>
  }
}) {
  const root = createRoot(el)
  root.render(<App experimental={experimental} />)
  return () => root.unmount()
}

export default { render }
