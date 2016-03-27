'use strict'

class RegisterAPI	{
  constructor(app) {
    this.app = app
  }

  setRoutes(configs) {
    return new Promise(resolve => {
      configs.forEach(config => {
        this.app[config.verb](config.path, (req, res, next) => {
          next()
        })
      })

      resolve(this.app)
    })
  }
}

export default RegisterAPI
