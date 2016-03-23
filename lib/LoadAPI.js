'use strict'

import { sync as read } from 'glob'

class LoadAPI	{
  constructor(basePath) {
    this.basePath = basePath
  }

  readConfigs() {
    return new Promise(resolve => {
      let configs = []
      let files = read(`${this.basePath}/**/*API.json`);

      files
        .map(file => require(file))
        .forEach(json => json.forEach(config => configs.push(config)))

      resolve(configs)
    })
  }
}

export default LoadAPI
