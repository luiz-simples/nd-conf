
import express from 'express'
import ndcConfigs from './ndcConfigs'

const ndcRest = (path) => {
  return ndcConfigs(path).then(({routes, actions}) => {
    const app = express()

    Object.keys(routes).map((key) => {
      return routes[key]
    }).forEach(({verb, path, exec}) => {
      app[verb](path, (req, res, next) => {
        const state = { app, req, res, exec }
        actions.execute(state).then(next)
      })
    })

    return app
  })
}

export default ndcRest
