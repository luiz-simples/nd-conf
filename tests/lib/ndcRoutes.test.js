jest.unmock('../../lib/ndcRoutes')

const path = require('path')
const ndcRoutes = require('../../lib/ndcRoutes')
const fixtures = path.resolve(__dirname.concat('/../support/fixtures/ndcRoutes'))

describe('ndcRoutes', () => {
  pit('load JSON configs', () => {
    const pathRoutes = `${fixtures}/happy`

    return ndcRoutes(pathRoutes).then(routes => expect(routes).toEqual({
      'GET: /end':   { verb: 'get', path: '/end',   file: `${fixtures}/happy/EndRest.json`   },
      'GET: /start': { verb: 'get', path: '/start', file: `${fixtures}/happy/StartRest.json` },
    }))
  })

  pit('verify duplicity of routes', () => {
    const pathRoutes = `${fixtures}/duplicity`

    let expectMessage = `Duplicity of route: "GET: /end" on files: "${fixtures}/duplicity/StartRest.json" and "${fixtures}/duplicity/EndRest.json"`
    let shouldReject = () => { throw new Error('should be rejected when duplicity of routes')}

    return ndcRoutes(pathRoutes)
      .then(shouldReject)
      .catch(err => expect(err.message).toEqual(expectMessage))
  })
})
