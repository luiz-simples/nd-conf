jest.unmock('express')
jest.unmock('../../lib/ndcRest')

import path       from 'path'
import express    from 'express'
import request    from 'supertest'
import ndcRest    from '../../lib/ndcRest'
import ndcConfigs from '../../lib/ndcConfigs'

describe('ndcExpress', () => {
  let mockRoutes
  let mockActions
  let actionsEndRoute

  beforeEach(() => {
    actionsEndRoute = [
      'GetEndParams',
      'GetEndValue',
      'GetEndSave',
      'GetEndShow'
    ]

    mockRoutes = {
      'GET: /end': {
        verb: 'get',
        path: '/end',
        file: '/happy/EndRest.json',
        exec: actionsEndRoute
      }
    }

    mockActions = { execute: jest.genMockFunction() }
    mockActions.execute.mockImplementation(() => new Promise(resolve => resolve()))

    ndcConfigs.mockImplementation(() => new Promise(resolve => {
      resolve({
        routes: mockRoutes,
        actions: mockActions
      })
    }))
  })

  it('call actions route', (done) => {
    const pathConfigs = '/happy'

    ndcRest(pathConfigs).then((app) => {
      request(app)
        .get('/end')
        .end((err, res) => {
          const firstArg  = 0
          const firstCall = 0
          const callActions = mockActions.execute.mock.calls[firstCall][firstArg].exec

          expect(callActions).toEqual(actionsEndRoute)
          done()
        })
    })
  })
})
