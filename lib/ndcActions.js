import glob from 'glob'

const loadActions = (path) => {
  return new Promise((resolve, reject) => {
    glob(`${path}/**/actions/*.js`, {}, (err, files) => {
      if (err) return reject(err)

      resolve(files.map((file) => {
        let actionClass = require(file).default
        actionClass.file = file
        return actionClass
      }))
    })
  })
}

const organize = (actions) => {
  let allActions = {}

  for (let i = 0, c = actions.length; i < c; i++) {
    const action = actions[i]
    const { actionName, file } = action
    const duplicated = allActions.hasOwnProperty(actionName)

    if (duplicated) throw new Error(`Duplicity of action: "${actionName}" on files: "${file}" and "${allActions[actionName].file}"`)

    allActions[actionName] = action
  }

  return allActions
}

const ndcActions = (path) => {
  return loadActions(path).then(organize)
}

export default ndcActions
