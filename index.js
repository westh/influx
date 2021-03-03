import axios from 'axios'

let influx = null

function init ({ url, org, bucket, token }) {
  influx = axios.create({
    baseURL: `${url}/api/v2/write`,
    params: {
      org,
      bucket
    },
    headers: { Authorization: `Token ${token}` }
  })
}

function insert ({ measurementName, host, data }) {
  const isInfluxInitiated = !!influx
  if (!isInfluxInitiated) throw new Error('Influx needs to be initiated')

  const fields = Object.entries(data)
    .map(entry => `${entry[0]}=${entry[1]}`)
    .join(',')
  return influx.post('', `${measurementName},host=${host} ${fields}`)
}

async function insertSync ({ measurementName, host, data }) {
  await insert({ measurementName, host, data })
}

export default { init, insert, insertSync }
