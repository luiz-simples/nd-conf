jest.dontMock('path')
jest.unmock('../../lib/ndcLoad')

import path       from 'path'
import ndcRoutes  from '../../lib/ndcRoutes'
import ndcActions from '../../lib/ndcActions'
import ndcConfigs from '../../lib/ndcConfigs'
import ndcLoad    from '../../lib/ndcLoad'

describe('ndcLoad', () => {
  let pathHappy
  let mockRoutes
  let mockActions
  let mockConfigs

  beforeEach(() => {
    pathHappy = '/happy'

    mockRoutes = {
      'GET: /end':   { verb: 'get', path: '/end',   file: '/happy/EndRest.json'   },
      'GET: /start': { verb: 'get', path: '/start', file: '/happy/StartRest.json' }
    }

    mockActions = {
      GetUsers:    jest.genMockFunction(),
      GetContacts: jest.genMockFunction()
    }

    mockConfigs = {
      TemplateEngine:    jest.genMockFunction(),
      CompressResponses: jest.genMockFunction()
    }

    ndcRoutes.mockImplementation(()  => new Promise(resolve => resolve(mockRoutes)))
    ndcActions.mockImplementation(() => new Promise(resolve => resolve(mockActions)))
    ndcConfigs.mockImplementation(() => new Promise(resolve => resolve(mockConfigs)))
  })

  pit('should load routes', () => {
    const pathLoad = '/happy'

    return ndcLoad(pathHappy).then(({ routes }) => {
      expect(ndcRoutes).toBeCalledWith(pathLoad)
      expect(routes).toEqual(mockRoutes)
    })
  })

  pit('should load actions', () => {
    return ndcLoad(pathHappy).then(({ actions }) => {
      expect(ndcActions).toBeCalledWith(pathHappy)
      expect(Object.keys(actions)).toEqual([
        'GetUsers',
        'GetContacts'
      ])
    })
  })

  pit('should load configs', () => {
    const pathLoad = '/happy'

    return ndcLoad(pathHappy).then(({ configs }) => {
      expect(ndcConfigs).toBeCalledWith(pathLoad)
      expect(Object.keys(configs)).toEqual([
        'TemplateEngine',
        'CompressResponses'
      ])
    })
  })

  pit('catch route duplicity', () => {
    const pathLoad   = '/any/app'
    const expectMessage = 'Duplicity of route: "GET: /end" on files: "/duplicity/StartRest.json" and "/duplicity/EndRest.json"'
    const shouldReject = () => { throw new Error('should be rejected when duplicity of routes')}

    ndcRoutes.mockImplementation(()  => new Promise((resolve, reject) => reject(new Error(expectMessage))))

    return ndcLoad(pathLoad)
      .then(shouldReject)
      .catch(err => expect(err.message).toEqual(expectMessage))
  })

  pit('catch action duplicity', () => {
    const pathLoad   = '/any/app'
    const expectMessage = 'Duplicity of action: "GetContacts" on files: "${fixtures}/duplicity/actions/GetContactsDuplicity.js" and "${fixtures}/duplicity/actions/GetContacts.js"'
    const shouldReject = () => { throw new Error('should be rejected when duplicity of actions')}

    ndcActions.mockImplementation(() => new Promise((resolve, reject) => reject(new Error(expectMessage))))

    return ndcLoad(pathLoad)
      .then(shouldReject)
      .catch(err => expect(err.message).toEqual(expectMessage))
  })

  pit('catch config duplicity', () => {
    const pathLoad   = '/any/app'
    const expectMessage = 'Duplicity of config: "TemplateEngine" on files: "${fixtures}/duplicity/TemplateEngineConfig.js" and "${fixtures}/duplicity/sub/TemplateEngineConfig.js"'
    const shouldReject = () => { throw new Error('should be rejected when duplicity of configs')}

    ndcConfigs.mockImplementation(() => new Promise((resolve, reject) => reject(new Error(expectMessage))))

    return ndcLoad(pathLoad)
      .then(shouldReject)
      .catch(err => expect(err.message).toEqual(expectMessage))
  })
})
