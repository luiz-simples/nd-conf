const ndcExecute = function(state) {
  const actionsPointers = state.exec.map(actionName => this[actionName])

  let runActions = Promise.resolve({})

  actionsPointers.forEach((action) => {
    runActions = runActions.then((scoped) => {
      return action(scoped || {}, state)
    })
  })

  return runActions.then((res) => res || {})
}

export default ndcExecute
