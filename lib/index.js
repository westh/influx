'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

const _axios = require('axios')

const _axios2 = _interopRequireDefault(_axios)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

let influx = null

function init (_ref) {
  const url = _ref.url
  const org = _ref.org
  const bucket = _ref.bucket
  const token = _ref.token

  influx = _axios2.default.create({
    baseURL: url + '/api/v2/write?org=' + org + '&bucket=' + bucket,
    headers: { Authorization: 'Token ' + token }
  })
}

function insert (_ref2) {
  const measurementName = _ref2.measurementName
  const host = _ref2.host
  const data = _ref2.data

  const isInfluxInitiated = !!influx
  if (!isInfluxInitiated) throw new Error('Influx needs to be initiated')

  const fields = Object.entries(data).map(function (entry) {
    return entry[0] + '=' + entry[1]
  }).join(',')
  return influx.post('', measurementName + ',host=' + host + ' ' + fields)
}

async function insertSync (_ref3) {
  const measurementName = _ref3.measurementName
  const host = _ref3.host
  const data = _ref3.data

  await insert({ measurementName: measurementName, host: host, data: data })
}

exports.default = { init: init, insert: insert, insertSync: insertSync }
module.exports = exports.default
