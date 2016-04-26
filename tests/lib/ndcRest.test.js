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
    const path = '/happy'
    const app  = express()

    return ndcRest({ path, app }).then((ndcApp) => {
      const first  = 0
      const second = 1

      expect(ndcApp.get.mock.calls[first]).toEqual(['/end', jasmine.any(Function)])
      expect(ndcApp.get.mock.calls[second]).toEqual(['/start', jasmine.any(Function)])
    })
  })
})
