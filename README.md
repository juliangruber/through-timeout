
# through-timeout

Through stream that calls a cb when no data has been written after the first x seconds.

## Example

```js
var Timeout = require('through-timeout');

source
.pipe(Timeout({
  objectMode: true,
  duration: 10000 
}, function () {
  // oh no!
  source.destroy();  
}))
.pipe(destination);
```

## API

### Timeout({ duration, objectMode=false }, cb)

## License

MIT
