const glob = require('glob')
const path = require('path')

const loadConfigs = (folder) => {
  return new Promise((resolve, reject) => {
    glob(`${folder}/**/*Config.js`, {}, (err, files) => {
      if (err) return reject(err)
      resolve(files.map((file) => {
        const run = require(file)
        const name = path.basename(file, 'Config.js')
        return { run, name, file }
      }))
    })
  })
}

const organize = (configs) => {
  let allConfigs = {}

  for (let i = 0, c = configs.length; i < c; i++) {
    const { name, file } = configs[i]
    const duplicated = allConfigs.hasOwnProperty(name)
    if (duplicated) throw new Error(`Duplicity of config: "${name}" on files: "${file}" and "${allConfigs[name].file}"`)
    allConfigs[name] = configs[i]
  }

  return allConfigs
}

module.exports = (path) => loadConfigs(path).then(organize)
