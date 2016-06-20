const Timeout = require('.');
const PassThrough = require('stream').PassThrough;

const src = PassThrough();

src
.pipe(Timeout({ duration: 500 }, () => {
  console.log('Timeout!');
  src.push(null);
}))
.pipe(process.stdout);

setTimeout(() => {
  src.push('First');
}, Math.random() * 1000);
