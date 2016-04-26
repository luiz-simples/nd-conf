jest.unmock('../../lib/ndcRest')

import path       from 'path'
import express    from 'express'
import ndcRest    from '../../lib/ndcRest'
import ndcConfigs from '../../lib/ndcConfigs'

describe('ndcRest', () => {
  let mockRoutes
  let mockActions

  beforeEach(() => {
    ndcConfigs.mockImplementation(() => new Promise(resolve => resolve({
      routes: {
        'GET: /end':   { verb: 'get', path: '/end',   file: '/happy/EndRest.json' },
        'GET: /start': { verb: 'get', path: '/start', file: '/happy/EndRest.json' }
      }
    })))
  })

  pit('load Rest Application', () => {
    const pathConfigs = '/happy'

    return ndcRest(pathConfigs).then((app) => {
      const first  = 0
      const second = 1

      expect(express).toBeCalled()
      expect(app.get.mock.calls[first]).toEqual(['/end', jasmine.any(Function)])
      expect(app.get.mock.calls[second]).toEqual(['/start', jasmine.any(Function)])
    })
  })
})
