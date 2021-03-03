# @westh/influx

Insert data into InfluxDB.

This code is stupid and tiny. Upside of that is that it is simple. It's basically *just* a wrapper of [InfluxDB's API](https://docs.influxdata.com/influxdb/v1.8/write_protocols/line_protocol_reference/).

If you need something more capable check out [the official client](https://github.com/influxdata/influxdb-client-js).

## Installation

```
npm install @westh/influx
```

## Usage

```javascript
const influx = require('@westh/influx')

influx.init({
  url: 'https://eu-central-1-1.aws.cloud2.influxdata.com',
  org: 'stupid-org',
  bucket: 'stupid-bucket',
  token: 'this-is-definitely-a-real-token-1337=='
})

try {
  const exampleData = {
    measurementName: 'test-name',
    host: 'test-host',
    data: {
      testFieldOne: 1,
      testFieldTwo: 1.234,
      testFieldThree: 'could-also-be-a-string'
    }
  }
  await influx.insert(exampleData)
} catch (error) {
  console.error(error)
}
```

## Testing

Before running `yarn test` you have to run `yarn build`, as the test script relies on the transpiled version.

## License

MIT
