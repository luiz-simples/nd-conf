jest.dontMock('path')
jest.unmock('../../lib/ndcActions')

const path = require('path')
const ndcActions = require('../../lib/ndcActions')

const fixtures = path.resolve(__dirname.concat('/../support/fixtures/ndcActions'))

describe('ndcActions', () => {
  pit('load JSON configs', () => {
    const pathActions = `${fixtures}/happy`

    return ndcActions(pathActions).then(actions => {
      const actionsList = Object.keys(actions)
      expect(actionsList).toContain('GetUsers')
      expect(actionsList).toContain('GetContacts')
    })
  })

  pit('verify duplicity of actions', () => {
    const pathActions = `${fixtures}/duplicity`

    let expectMessage = `Duplicity of action: "GetContacts" on files: "${fixtures}/duplicity/sub/GetContactsAction.js" and "${fixtures}/duplicity/GetContactsAction.js"`
    let shouldReject = () => { throw new Error('should be rejected when duplicity of actions')}

    return ndcActions(pathActions)
      .then(shouldReject)
      .catch(err => expect(err.message).toEqual(expectMessage))
  })
})
