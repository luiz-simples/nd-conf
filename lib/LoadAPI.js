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

      files.map(require).forEach(json => json.forEach(config => configs.push(config)))

      resolve(configs)
    }

    return new Promise(loadConfigs).then(this.verifyDuplicity)
  }

  verifyDuplicity(configs) {
    let routes = new Set()

    configs.forEach((config) => {
      const route = `${config.verb}:${config.path}`
      const isDuplicated = routes.has(route);
      if (isDuplicated) throw new Error(`Duplicity of route: "${config.verb}" on "${config.path}"`)
      routes.add(route);
    })

    return configs
  }
}

export default LoadAPI
