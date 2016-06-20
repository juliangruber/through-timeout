var Transform = require('stream').Transform;
var assert = require('assert');

module.exports = function (opts, cb) {
  assert(opts.duration, '.duration required');
  var id = setTimeout(cb, opts.duration);
  return Transform({
    objectMode: opts.objectMode,
    transform: function (chunk, _, done) {
      if (id) {
        clearTimeout(id);
        id = null;
      }
      done(null, chunk);
    }
  });
};

