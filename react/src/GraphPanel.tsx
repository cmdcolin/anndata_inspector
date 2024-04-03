import React from 'react'
import * as Plot from '@observablehq/plot'
import { observer } from 'mobx-react'

// locals
import PlotFigure from './PlotFigure'
import { StateModel } from './stateModel'

const GraphPanel = observer(function ({ state }: { state: StateModel }) {
  const { dataSummary } = state
  return (
    <div>
      <PlotFigure
        options={{
          y: { grid: true },
          marks: [
            Plot.rectY(dataTable, Plot.binX({ y: 'count' }, { x: 'weight' })),
            Plot.ruleY([0]),
          ],
        }}
      />
    </div>
  )
})
export default GraphPanel
