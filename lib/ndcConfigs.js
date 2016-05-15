import glob from 'glob'
import path from 'path'

const loadConfigs = (folder) => {
  return new Promise((resolve, reject) => {
    glob(`${folder}/**/*Config.js`, {}, (err, files) => {
      if (err) return reject(err)
      resolve(files.map((file) => {
        let run = require(file).default
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

const ndcConfigs = (path) => loadConfigs(path).then(organize)
export default ndcConfigs
