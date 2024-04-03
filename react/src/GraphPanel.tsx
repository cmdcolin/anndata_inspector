import React from 'react'
import * as Plot from '@observablehq/plot'
import { observer } from 'mobx-react'

// locals
import PlotFigure from './PlotFigure'
import { StateModel } from './stateModel'

const GraphPanel = observer(function ({ state }: { state: StateModel }) {
  const { dataSummary } = state
  return dataSummary ? (
    <>
      {Object.keys(dataSummary[0]).map(k => {
        console.log({ k }, dataSummary[0])
        const s = new Set<string>()
        if (typeof dataSummary[0][k] === 'string') {
          for (const row of dataSummary) {
            s.add(row[k])
          }
        }
        if (s.size > 20) {
          return null
        } else if (typeof dataSummary[0][k] === 'string') {
          return (
            <div key={k} style={{ width: 500, height: 500 }}>
              <PlotFigure
                options={{
                  y: { grid: true },
                  marks: [
                    Plot.rectY(
                      dataSummary,
                      Plot.groupX({ y: 'count' }, { x: k }),
                    ),
                    Plot.ruleY([0]),
                  ],
                }}
              />
            </div>
          )
        } else {
          return (
            <div key={k} style={{ width: 500, height: 500 }}>
              <PlotFigure
                options={{
                  y: { grid: true },
                  marks: [
                    Plot.rectY(
                      dataSummary,
                      Plot.binX({ y: 'count' }, { x: k }),
                    ),
                    Plot.ruleY([0]),
                  ],
                }}
              />
            </div>
          )
        }
      })}
    </>
  ) : null
})
export default GraphPanel
