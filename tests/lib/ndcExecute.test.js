jest.unmock('../../lib/ndcExecute')

import path from 'path'
import ndcExecute from '../../lib/ndcExecute'

describe('ndcExecute', () => {
  const argScope  = 0
  const argState  = 1
  const firstCall = 0

  let state, resultAction1, allActions

  beforeEach(() => {
    state = {}
    resultAction1 = 'resultAction1'

    allActions = {
      action1: jest.genMockFunction().mockImplementation(() => resultAction1),
      action2: jest.genMockFunction(),
      execute: ndcExecute
    }
  })

  pit('execute one action', () => {
    state.exec = [ 'action1' ]

    return allActions.execute(state).then(() => {
      const scoped = allActions.action1.mock.calls[firstCall][argScope]
      const execPassed = allActions.action1.mock.calls[firstCall][argState].exec

      expect(scoped).toEqual({})
      expect(execPassed).toEqual([ 'action1' ])
    })
  })

  pit('execute two actions', () => {
    state.exec = [ 'action1', 'action2' ]

    return allActions.execute(state).then(() => {
      const action1CalledFirstArg = allActions.action1.mock.calls[firstCall][argScope]
      const action2CalledFirstArg = allActions.action2.mock.calls[firstCall][argScope]

      expect(action1CalledFirstArg).toEqual({})
      expect(action2CalledFirstArg).toEqual(resultAction1)
    })
  })
})
