const app = {
  get: jest.genMockFunction(),
  put: jest.genMockFunction(),
  post: jest.genMockFunction(),
  delete: jest.genMockFunction()
}

export default jest.genMockFunction().mockImplementation(() => app)
