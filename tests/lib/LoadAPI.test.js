'use strict';

jest.unmock('../../lib/LoadAPI');

import path from 'path';
import LoadAPI from '../../lib/LoadAPI';

const fixtures = path.resolve(__dirname.concat('/../support/fixtures/LoadAPI'));

describe('LoadAPI', () => {
  pit('load JSON configs', () => {
    let loadAPI = new LoadAPI(`${fixtures}/happy`);

    return loadAPI
      .readConfigs()
      .then(configs => expect(configs).toEqual([
        {
          "verb": "get",
          "path": "/end"
        },
        {
          "verb": "get",
          "path": "/start"
        },
      ]))
  });

  pit('verify duplicity of routes', () => {
    let loadAPI = new LoadAPI(`${fixtures}/duplicity`);
    let expectMessage = 'Duplicity of route: "get" on "/end"';
    let shouldReject = () => { throw new Error('should be rejected when duplicity of routes')};

    return loadAPI
      .readConfigs()
      .then(shouldReject)
      .catch(err => expect(err.message).toEqual(expectMessage))
  });
});
