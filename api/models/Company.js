module.exports = {
  attributes: {
    name:    { type: 'string', required: true },
    city:    { type: 'string' },
    address: { type: 'string' },

    // ASSOCIATION
    jobs: {
      collection: 'Job',
      via: 'company',
    }
  }
}