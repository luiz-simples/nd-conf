import ndcLoad from './ndcLoad'

const ndcApp = (server) => {
  return ndcLoad(server.path).then((loaded) => {
    const configs = loaded.configs
    const serverLoaded = Object.assign(loaded, server)
    Object.keys(configs).map(key => configs[key]).forEach(conf => conf(serverLoaded))
    return serverLoaded
  })
}

export default ndcApp
