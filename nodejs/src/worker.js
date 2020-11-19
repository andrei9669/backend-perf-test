const { parentPort } = require('worker_threads')
const bench = require('./bench')

parentPort.on('message', () => {
  const result = bench(100)
  parentPort.postMessage(result)
})
