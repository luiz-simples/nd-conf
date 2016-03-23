'use strict'

import { sync as read } from 'glob'

class LoadAPI	{
  constructor(basePath) {
    this.basePath = basePath
  }

  readConfigs() {
    const loadConfigs = (resolve) => {
      let configs = []
      const files = read(`${this.basePath}/**/*API.json`)

      files
        .map(file => require(file))
        .forEach(json => json.forEach(config => configs.push(config)))

      resolve(configs)
    }

    const verifyDuplicity = (configs) => {
      let routes = new Set()

      configs.forEach((config) => {
        let route = `${config.verb}:${config.path}`
        if (routes.has(route)) throw new Error(`Duplicity of route: "${config.verb}" on "${config.path}"`)
        routes.add(route);
      })

      return configs
    }

    return new Promise(loadConfigs).then(verifyDuplicity)
  }
}

export default LoadAPI
