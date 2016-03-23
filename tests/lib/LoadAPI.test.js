'use strict';

jest.unmock('../../lib/LoadAPI');

import path from 'path';
import LoadAPI from '../../lib/LoadAPI';

const fixtures = path.resolve(__dirname.concat('/../support/fixtures/api'));

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
});
