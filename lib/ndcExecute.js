module.exports = function(context) {
  const pointers = context.exec.map(actionName => this[actionName].run)

  let runActions = Promise.resolve()

  pointers.forEach(action => {
    runActions = runActions.then(res => action(res || {}, context))
  })

  return runActions.then(res => res || {})
}
