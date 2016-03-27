'use strict';

const app = {
  get: jest.genMockFunction(),
  put: jest.genMockFunction(),
  post: jest.genMockFunction(),
  delete: jest.genMockFunction()
}

export default () => {
  return app
}
