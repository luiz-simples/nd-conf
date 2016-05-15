import ndcLoad from './ndcLoad'

const ndcApp = (server) => {
  const { path, app } = server

  return ndcLoad(path).then(({ routes, actions }) => {
    Object.keys(routes).map(key => routes[key]).forEach(({ verb, path, exec }) => {
      app[verb](path, (req, res, next) => {
        const context = Object.assign({ req, res, exec, actions }, server)
        actions.execute(context).then(next)
      })
    })

    return app
  })
}

export default ndcApp
