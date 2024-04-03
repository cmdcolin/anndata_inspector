import React from 'react'
import { createRoot } from 'react-dom/client'

// locals
import App from './App'

// css
import './index.css'
import { stateModelFactory } from './stateModel'

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
  root.render(<App state={stateModelFactory(experimental).create()} />)
  return () => root.unmount()
}

export default { render }
