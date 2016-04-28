const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;'
};

const escapeHtmlChar = (char) => htmlEscapes[char];

const clean = (input) => input.replace(/[&<>"'`]/g, escapeHtmlChar);

const passCheck = (password) => password.match(/[^a-zA-Z0-9]/) === null;

module.exports = {
  clean,
  passCheck
};
