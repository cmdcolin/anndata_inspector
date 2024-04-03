import React, { useEffect, useRef } from 'react'
import * as Plot from '@observablehq/plot'

// For server-side rendering, see
// https://codesandbox.io/s/plot-react-f1jetw?file=/src/PlotFigure.js:89-195

// This example from
// https://codesandbox.io/p/sandbox/plot-react-csr-p4cr7t?file=%252Fsrc%252FPlotFigure.jsx
export default function PlotFigure({ options }: { options: Plot.PlotOptions }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!options || !containerRef.current) {
      return
    }
    const plot = Plot.plot(options)
    containerRef.current.append(plot)
    return () => plot.remove()
  }, [options])

  return <div ref={containerRef} />
}
