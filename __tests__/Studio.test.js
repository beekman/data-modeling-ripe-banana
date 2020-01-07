const mongoose = require('mongoose');

const Studio = require('../lib/models/Actor');

describe('Studio model', () => {
  it('has a required name', () => {
    const studio = new Studio();
    const { errors } = studio.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });
});