const confLoad = require('./load')

module.exports = async boot => {
  const engines = await confLoad(boot.modules)
  const configs = Object.values(engines.configs)
  let context = Object.assign(boot, engines)
  const runConfig = (run, config) => run.then(() => config(context))
  const queue = Promise.resolve()

  return configs
    .reduce(runConfig, queue)
    .then(() => context)
}
