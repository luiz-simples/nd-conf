jest.dontMock('path')
jest.unmock('../../lib/ndcConfigs')

import path from 'path'
import ndcConfigs from '../../lib/ndcConfigs'

const fixtures = path.resolve(__dirname.concat('/../support/fixtures/ndcConfigs'))

describe('ndcConfigs', () => {
  pit('load JSON configs', () => {
    const pathConfigs = `${fixtures}/happy`

    return ndcConfigs(pathConfigs).then(configs => {
      const configsList = Object.keys(configs)
      expect(configsList).toContain('TemplateEngine')
      expect(configsList).toContain('CompressResponses')
    })
  })

  pit('verify duplicity of configs', () => {
    const pathConfigs = `${fixtures}/duplicity`

    let expectMessage = `Duplicity of config: "TemplateEngine" on files: "${fixtures}/duplicity/TemplateEngineConfig.js" and "${fixtures}/duplicity/sub/TemplateEngineConfig.js"`
    let shouldReject = () => { throw new Error('should be rejected when duplicity of configs')}

    return ndcConfigs(pathConfigs)
      .then(shouldReject)
      .catch(err => expect(err.message).toEqual(expectMessage))
  })
})
