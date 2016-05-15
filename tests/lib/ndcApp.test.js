jest.unmock('../../lib/ndcApp')

import ndcApp  from '../../lib/ndcApp'
import ndcLoad from '../../lib/ndcLoad'

describe('ndcApp', () => {
  let mockLoaded
  let mockConfigs

  beforeEach(() => {
    const mockRoutes  = {}
    const mockActions = {}
    mockConfigs = { Express: { run: jest.genMockFunction() } }

    mockLoaded  = {
      routes:  mockRoutes,
      actions: mockActions,
      configs: mockConfigs,
    }

    ndcLoad.mockImplementation(() => new Promise(resolve => resolve(mockLoaded)))
  })

  pit('should load configs', () => {
    const app    = jest.genMockFunction()
    const path   = '/happy'
    const server = { path }

    return ndcApp(server).then((ndcApp) => {
      expect(ndcLoad).toBeCalledWith(path)
      const expectedServerLoad =  Object.assign({}, server, mockLoaded)
      expect(mockConfigs.Express.run).toBeCalledWith(expectedServerLoad)
    })
  })
})
