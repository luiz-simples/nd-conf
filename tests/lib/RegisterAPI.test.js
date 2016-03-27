'use strict'

jest.unmock('../../lib/RegisterAPI')

import path from 'path'
import express from 'express'
import RegisterAPI from '../../lib/RegisterAPI'

describe('RegisterAPI', () => {
  pit('should register one route', () => {
    let app = express()
    let registerAPI = new RegisterAPI(app)
    let configs = [{ verb: "get", path: "/start" }]

    return registerAPI
      .setRoutes(configs)
      .then((appRouted) => expect(appRouted.get).toBeCalledWith('/start', jasmine.any(Function)))
  })

  pit('should register all routes', () => {
    let app = express()
    let registerAPI = new RegisterAPI(app)
    let configs = [
      { verb: "get",  path: "/start"  },
      { verb: "post", path: "/end"    },
      { verb: "put",  path: "/middle" }
    ]

    return registerAPI
      .setRoutes(configs)
      .then((appRouted) => {
        expect(appRouted.get).toBeCalledWith('/start',  jasmine.any(Function))
        expect(appRouted.post).toBeCalledWith('/end',   jasmine.any(Function))
        expect(appRouted.put).toBeCalledWith('/middle', jasmine.any(Function))
      })
  })
})
