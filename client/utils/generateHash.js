module.exports = () => {
  let hash = '';
  for (let i = 0; i < 24; i++) {
    hash += Math.floor(Math.random() * 10);
  }

  return hash;
};
