jest.dontMock('path')
jest.unmock('../../lib/ndcConfigs')

import path       from 'path'
import ndcRoutes  from '../../lib/ndcRoutes'
import ndcActions from '../../lib/ndcActions'
import ndcConfigs from '../../lib/ndcConfigs'

describe('ndcConfigs', () => {
  let mockRoutes
  let mockActions

  beforeEach(() => {
    mockRoutes = {
      'GET: /end':   { verb: 'get', path: '/end',   file: '/happy/EndRest.json'   },
      'GET: /start': { verb: 'get', path: '/start', file: '/happy/StartRest.json' }
    }

    mockActions = {
      GetContacts: jest.genMockFunction(),
      GetUsers:    jest.genMockFunction()
    }
  })

  pit('load actions and routes', () => {
    const pathConfigs = '/happy'

    ndcRoutes.mockImplementation(()  => new Promise(resolve => resolve(mockRoutes)))
    ndcActions.mockImplementation(() => new Promise(resolve => resolve(mockActions)))

    return ndcConfigs(pathConfigs).then(({routes, actions}) => {
      expect(ndcRoutes).toBeCalledWith(pathConfigs)
      expect(ndcActions).toBeCalledWith(pathConfigs)
      expect(routes).toEqual(mockRoutes)
      expect(Object.keys(actions)).toEqual([
        'GetContacts',
        'GetUsers'
      ])
    })
  })

  pit('catch route duplicity', () => {
    const pathConfigs   = '/happy'
    const expectMessage = 'Duplicity of route: "GET: /end" on files: "/duplicity/StartRest.json" and "/duplicity/EndRest.json"'
    const shouldReject = () => { throw new Error('should be rejected when duplicity of routes')}

    ndcRoutes.mockImplementation(()  => new Promise((resolve, reject) => reject(new Error(expectMessage))))
    ndcActions.mockImplementation(() => new Promise(resolve => resolve(mockActions)))

    return ndcConfigs(pathConfigs)
      .then(shouldReject)
      .catch(err => expect(err.message).toEqual(expectMessage))
  })

  pit('catch action duplicity', () => {
    const pathConfigs   = '/happy'
    const expectMessage = 'Duplicity of action: "GetContacts" on files: "${fixtures}/duplicity/actions/GetContactsDuplicity.js" and "${fixtures}/duplicity/actions/GetContacts.js"'
    const shouldReject = () => { throw new Error('should be rejected when duplicity of actions')}

    ndcRoutes.mockImplementation(()  => new Promise(resolve => resolve(mockRoutes)))
    ndcActions.mockImplementation(() => new Promise((resolve, reject) => reject(new Error(expectMessage))))

    return ndcConfigs(pathConfigs)
      .then(shouldReject)
      .catch(err => expect(err.message).toEqual(expectMessage))
  })
})
