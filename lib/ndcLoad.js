import ndcRoutes  from './ndcRoutes'
import ndcActions from './ndcActions'
import ndcConfigs from './ndcConfigs'

const ndcLoad = (path) => {
  return ndcRoutes(path).then(routes => {
    return ndcActions(path).then(actions => {
      return ndcConfigs(path).then(configs => {
        return { routes, actions, configs }
      })
    })
  })
}

export default ndcLoad
