const glob = require('glob')

const loadRoutes = (path) => {
  return new Promise((resolve, reject) => {
    const patternSearch = `${path}/**/*Routes.json`

    glob(patternSearch, {}, (err, files) => {
      if (err) return reject(err)

      let allRoutes = []

      files.forEach((file) => {
        require(file).forEach((route) => {
          route.file = file
          allRoutes.push(route)
        })
      })

      resolve(allRoutes)
    })
  })
}

const organize = (routes) => {
  let config = {}

  for (let i = 0, c = routes.length; i < c; i++) {
    const route = routes[i]
    const { verb, path, file } = route
    const uri = `${verb.toUpperCase()}: ${path}`
    const duplicated = config.hasOwnProperty(uri)

    if (duplicated) throw new Error(`Duplicity of route: "${uri}" on files: "${file}" and "${config[uri].file}"`)

    config[uri] = route
  }

  return config
}

module.exports = (path) => {
  return loadRoutes(path).then(organize)
}
