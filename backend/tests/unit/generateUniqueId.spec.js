const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('generateUniqueId', () => {
  it('should generate an unique ID with 8 bytes', () => {
    const id = generateUniqueId();
    expect(id).toHaveLength(8);
  });
});
