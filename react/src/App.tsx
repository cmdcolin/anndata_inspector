import React, { useState } from 'react'
import {
  useClientPoint,
  useFloating,
  useInteractions,
} from '@floating-ui/react'
import { createPortal } from 'react-dom'
import { observer } from 'mobx-react'
import { StateModel } from './stateModel'
import GraphPanel from './GraphPanel'
import SVGRep from './SVGRep'

const App = observer(function App({ state }: { state: StateModel }) {
  const [mouseover, setMouseover] = useState('')

  const { refs, floatingStyles, context } = useFloating({
    placement: 'right',
  })

  const clientPoint = useClientPoint(context)
  const { getFloatingProps } = useInteractions([clientPoint])

  return (
    <div>
      {state.error ? (
        <div style={{ color: 'red' }}>{`${state.error}`}</div>
      ) : null}
      <br />
      <div style={{ display: 'flex' }}>
        {mouseover
          ? createPortal(
              <div
                className="tooltip"
                ref={refs.setFloating}
                style={{
                  ...floatingStyles,
                  zIndex: 100000,
                  pointerEvents: 'none',
                }}
                {...getFloatingProps()}
              >
                {mouseover}
              </div>,
              document.body,
            )
          : null}

        <SVGRep state={state} width={400} height={400} setMouseover={setMouseover}/>
        <div>
          <b>{state.simpleEntryToFetch || state.multiLayerEntryToFetch}</b>
          {state.options ? (
            state.options.length ? (
              <div>
                <label htmlFor="choices">Choices: </label>
                <select
                  id="choices"
                  value={state.currentOptionsChoice}
                  onChange={event =>
                    state.setCurrentOptionsChoice(event.target.value)
                  }
                >
                  {state.options.map(o => (
                    <option key={o} id={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>No options</div>
            )
          ) : null}
          <div>
            {state.dataResult ? (
              <div dangerouslySetInnerHTML={{ __html: state.dataResult }} />
            ) : null}
            <GraphPanel state={state} />
          </div>
        </div>
      </SVGRep>
    </div>
  )
})

export default App
