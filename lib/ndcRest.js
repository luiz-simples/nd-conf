
import ndcConfigs from './ndcConfigs'

const ndcRest = ({ path, app }) => {
  return ndcConfigs(path).then((config) => {
    Object.keys(config.routes).map((key) => {
      return config.routes[key]
    }).forEach(({ verb, path, exec }) => {
      app[verb](path, (req, res, next) => {
        const state = { app, req, res, config, exec }
        config.actions.execute(state).then(next)
      })
    })

    return app
  })
}

export default ndcRest
