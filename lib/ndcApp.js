const ndcLoad = require('./ndcLoad')

module.exports = (server) => {
  return ndcLoad(server.path).then((loaded) => {
    const configs = loaded.configs
    const serverLoaded = Object.assign(loaded, server)
    Object.keys(configs).map(key => configs[key].run).forEach(conf => conf(serverLoaded))
    return serverLoaded
  })
}
