const ndcRoutes  = require('./ndcRoutes')
const ndcActions = require('./ndcActions')
const ndcConfigs = require('./ndcConfigs')

module.exports = (path) => {
  return ndcRoutes(path).then(routes => {
    return ndcActions(path).then(actions => {
      return ndcConfigs(path).then(configs => {
        return { routes, actions, configs }
      })
    })
  })
}
