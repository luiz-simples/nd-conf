import ndcRoutes  from './ndcRoutes'
import ndcActions from './ndcActions'

const ndcConfigs = (path) => {
  return ndcRoutes(path).then(routes => {
    return ndcActions(path).then(actions => {
      return {
        routes: routes,
        actions: actions
      }
    })
  })
}

export default ndcConfigs
