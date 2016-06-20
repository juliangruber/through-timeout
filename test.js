var test = require('tape');
var Timeout = require('.');
var PassThrough = require('stream').PassThrough;
var Writable = require('stream').Writable;

test('duration required', function (t) {
  t.throws(function () {
    Timeout({}, function () {});
  });
  t.end();
});

test('no timeout', function (t) {
  t.plan(1);

  var src = PassThrough();
  src
  .pipe(Timeout({ duration: 1000 }, function () {
    t.fail();
  }))
  .pipe(Writable({
    write: function (chunk, _, done) {
      t.equal(chunk.toString(), 'hey!');
      done();
    }
  }));
  src.push('hey!');
});

test('timeout', function (t) {
  t.plan(2);

  var src = PassThrough();
  src
  .pipe(Timeout({ duration: 100 }, function () {
    t.ok(true);
  }))
  .pipe(Writable({
    write: function (chunk, _, done) {
      t.equal(chunk.toString(), 'hey!');
      done();
    }
  }));
  setTimeout(function () {
    src.push('hey!');
  }, 200);
});

test('object mode', function (t) {
  t.plan(1);

  var src = PassThrough({ objectMode: true });
  src
  .pipe(Timeout({
    objectMode: true,
    duration: 1000
  }, function () {
    t.fail();
  }))
  .pipe(Writable({
    objectMode: true,
    write: function (chunk, _, done) {
      t.equal(chunk.msg, 'hey!');
      done();
    }
  }));
  src.push({ msg: 'hey!' });
});

