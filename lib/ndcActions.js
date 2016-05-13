import glob from 'glob'
import path from 'path'
import ndcExecute from './ndcExecute'

const loadActions = (folder) => {
  return new Promise((resolve, reject) => {
    glob(`${folder}/**/*Action.js`, {}, (err, files) => {
      if (err) return reject(err)
      resolve(files.map((file) => {
        let run = require(file).default
        const name = path.basename(file, 'Action.js')
        return { run, name, file }
      }))
    })
  })
}

const organize = (actions) => {
  let allActions = {}

  for (let i = 0, c = actions.length; i < c; i++) {
    const { name, file } = actions[i]
    const duplicated = allActions.hasOwnProperty(name)
    if (duplicated) throw new Error(`Duplicity of action: "${name}" on files: "${file}" and "${allActions[name].file}"`)
    allActions[name] = actions[i]
  }

  return allActions
}

const ndcActions = (path) => {
  return loadActions(path).then(organize).then((actions) => {
    actions.execute = ndcExecute
    return actions
  })
}

export default ndcActions
