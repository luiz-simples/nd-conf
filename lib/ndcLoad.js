import ndcRoutes  from './ndcRoutes'
import ndcActions from './ndcActions'

const ndcLoad = (path) => {
  return ndcRoutes(path).then(routes => {
    return ndcActions(path).then(actions => {
      return { routes, actions }
    })
  })
}

export default ndcLoad
