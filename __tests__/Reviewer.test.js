const mongoose = require('mongoose');

const Reviewer = require('../lib/models/Reviewer');

describe('Reviewer model', () => {
  it('has a required name', () => {
    const reviewer = new Reviewer();
    const { errors } = reviewer.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });
  it('has a required company', () => {
    const reviewer = new Reviewer();
    const { errors } = reviewer.validateSync();

    expect(errors.company.message).toEqual('Path `company` is required.');
  });
});
