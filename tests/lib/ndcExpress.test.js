jest.unmock('../../lib/ndcApp')

import express from 'express'
import request from 'supertest'

import ndcApp  from '../../lib/ndcApp'
import ndcLoad from '../../lib/ndcLoad'

describe('ndcApp with express', () => {
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

    ndcLoad.mockImplementation(() => new Promise(resolve => {
      resolve({
        routes: mockRoutes,
        actions: mockActions,
        configs: {
          Express: {
            run: (server) => {
              const { app, routes, actions } = server

              Object.keys(routes).map(key => routes[key]).forEach(({ verb, path, exec }) => {
                app[verb](path, (req, res, next) => {
                  const context = Object.assign({ req, res, exec, actions }, server)
                  actions.execute(context).then(next)
                })
              })
            }
          }
        }
      })
    }))
  })

  it('call actions route', (done) => {
    const path = '/happy'
    const app = express()

    ndcApp({ path, app }).then(() => {
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
