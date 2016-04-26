jest.unmock('../../lib/ndcActions')

import path from 'path'
import ndcActions from '../../lib/ndcActions'

const fixtures = path.resolve(__dirname.concat('/../support/fixtures/ndcActions'))

describe('ndcActions', () => {
  pit('load JSON configs', () => {
    const pathActions = `${fixtures}/happy`

    return ndcActions(pathActions).then(actions => expect(Object.keys(actions)).toEqual([
      'GetContacts',
      'GetUsers'
    ]))
  })

  pit('verify duplicity of actions', () => {
    const pathActions = `${fixtures}/duplicity`

    let expectMessage = `Duplicity of action: "GetContacts" on files: "${fixtures}/duplicity/actions/GetContactsDuplicity.js" and "${fixtures}/duplicity/actions/GetContacts.js"`
    let shouldReject = () => { throw new Error('should be rejected when duplicity of actions')}

    return ndcActions(pathActions)
      .then(shouldReject)
      .catch(err => expect(err.message).toEqual(expectMessage))
  })
})
