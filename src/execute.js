const isFunction = pointer => typeof pointer === 'function'
const isUndefined = pointer => typeof pointer === 'undefined'
const input = res => isUndefined(res) ? {} : res

module.exports = async (context, exec) => {
  const {actions: actionList} = context
  const actions = exec.map(action => isFunction(action) ? action : actionList[action])
  const queue = Promise.resolve()
  const runAction = (run, action) => run.then(res => action(input(res), Object.assign({}, context)))

  return actions
    .reduce(runAction, queue)
    .then(input)
}
