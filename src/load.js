const execute = require('./execute')

module.exports = async allModules => {
  const modules = Object.keys(allModules)
  let structure = {execute}

  modules.forEach(name => {
    const moduleObj = allModules[name]
    const attrs = Object.keys(moduleObj)

    attrs.forEach(attr => {
      if (!structure[attr]) structure[attr] = {}
      const moduleAttr = moduleObj[attr]
      Object.keys(moduleAttr).forEach(gear => {
        structure[attr][`${name}#${gear}`] = moduleAttr[gear]
      })
    })
  })

  return structure
}
