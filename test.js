import influx from './lib/index.js'

influx.init({
  url: process.env.TEST_URL,
  org: process.env.TEST_ORG,
  bucket: process.env.TEST_BUCKET,
  token: process.env.TEST_TOKEN
})

function randomRange (range) {
  return Math.random() * range - Math.random() * range
}

async function main () {
  try {
    const testData = {
      measurementName: 'test-name',
      host: 'test-host',
      data: {
        something: 180 + randomRange(10),
        somethingElse: 10.2 + randomRange(2)
      }
    }

    await influx.insert(testData)
  } catch (error) {
    console.error(error)
  }
}

main()
