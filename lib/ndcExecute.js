const ndcExecute = function(context) {
  const actionsPointers = context.exec.map(actionName => this[actionName])

  let runActions = Promise.resolve()

  actionsPointers.forEach(action => {
    runActions = runActions.then(res => {
      return action(res || {}, context)
    })
  })

  return runActions.then(res => res || {})
}

export default ndcExecute
