import React from 'react'
import * as Plot from '@observablehq/plot'
import PlotFigure from './PlotFigure'

import { StateModel } from './stateModel'

const GraphPanel = observer(function ({ state }: { state: StateModel }) {
  // const { dataTable } = state
  return (
    <div>
      <PlotFigure
        options={{
          marks: [Plot.binX({ y: 'sum' }, { x: 'culmen_length_mm', y: '' })],
        }}
      />
    </div>
  )
})
export default GraphPanel
