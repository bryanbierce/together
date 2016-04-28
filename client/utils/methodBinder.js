const methodsToSkip = {
  constructor: true,
  render: true
};

module.exports = function() {
  const proto = Object.getPrototypeOf(this);
  const keys = Object.getOwnPropertyNames(proto);
  keys.forEach((key) => {
    if (!methodsToSkip[key] && (typeof this[key] === 'function')) {
      this[key] = this[key].bind(this);
    }
  });
};
