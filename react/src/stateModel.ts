import { autorun } from 'mobx'
import { Instance, addDisposer, types } from 'mobx-state-tree'

interface Runner {
  invoke: (arg: string, arg2: unknown) => Promise<[arg: string]>
}

export function stateModelFactory(runner: Runner) {
  return types
    .model({})
    .volatile(() => ({
      error: undefined as unknown,
      options: undefined as string[] | undefined,
      exp: undefined as Runner | undefined,
      currentOptionsChoice: '',
      dataResult: '',
      multiLayerEntryToFetch: '',
      simpleEntryToFetch: '',
    }))
    .actions(self => ({
      clear() {
        self.error = undefined
        self.dataResult = ''
      },
      setExp(e: Runner) {
        self.exp = e
      },
      setError(e: unknown) {
        self.error = e
      },
      setCurrentOptionsChoice(opt: string) {
        self.currentOptionsChoice = opt
      },
      setOptions(opts?: string[]) {
        self.options = opts
      },
      setDataResult(res: string) {
        self.dataResult = res
      },
      setMultiLayerEntryToFetch(res: string) {
        self.multiLayerEntryToFetch = res
      },
      setSimpleEntryToFetch(res: string) {
        self.simpleEntryToFetch = res
      },
    }))
    .actions(self => ({
      afterCreate() {
        addDisposer(
          self,
          autorun(async () => {
            try {
              if (self.simpleEntryToFetch) {
                self.clear()
                self.setOptions(undefined)
                self.setMultiLayerEntryToFetch('')
                const [ret] = await runner.invoke('_echo', {
                  type: 'simple',
                  val: self.simpleEntryToFetch,
                })
                self.setDataResult(ret)
              }
            } catch (e) {
              console.error('simple', e)
              self.setError(e)
            }
          }),
        )
        addDisposer(
          self,
          autorun(async () => {
            try {
              if (self.currentOptionsChoice && self.multiLayerEntryToFetch) {
                self.clear()
                const [ret] = await runner.invoke('_echo', {
                  type: 'options',
                  val: self.currentOptionsChoice,
                  obj: self.multiLayerEntryToFetch,
                })
                self.setDataResult(ret)
              }
            } catch (e) {
              console.error('options', e)
              self.setError(e)
            }
          }),
        )
        addDisposer(
          self,
          autorun(async () => {
            try {
              if (self.multiLayerEntryToFetch) {
                self.clear()
                self.setCurrentOptionsChoice('')
                self.setOptions(undefined)
                self.setSimpleEntryToFetch('')
                const [ret] = await runner.invoke('_echo', {
                  type: 'getopts',
                  val: self.multiLayerEntryToFetch,
                })
                // @ts-expect-error string[] in this case
                self.setOptions(ret)
                self.setCurrentOptionsChoice(ret[0])
              }
            } catch (e) {
              console.error('getopts', e)
              self.setError(e)
            }
          }),
        )
      },
    }))
}

export type StateModel = Instance<ReturnType<typeof stateModelFactory>>
