const cluster = require('cluster')
const http = require('http')
const {StaticPool} = require('node-worker-threads-pool')
const numCPUs = require('os').cpus().length

const bench = require("./bench")

const port = 5000


const S = process.env.STATE;
const C = "CLUSTER";
const W = "WORKER";
const C_W = "CLUSTER_WORKER"

const start = async function startServer() {
  // Cluster
  if (cluster.isMaster && (S === C || S === C_W)) {
    console.log(`Master ${process.pid} is running.`)
    cluster.schedulingPolicy = cluster.SCHED_RR

    // Run cluster.fork based on numCPUs
    for (let i = 0; i < numCPUs; i += 1) {
      cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`A worker with ID ${worker.process.pid} died.`)
    })
  } else {
    console.log(`${S === W || S === undefined ? "Process" : "Cluster"} ${process.pid} is running.`)

    // Path to worker.js
    const filePath = './src/worker.js'

    // Create worker pool
    const pool = new StaticPool({
      size: 15,
      task: filePath,
      workerData: {},
    })

    // Simple request router
    const router = async function requestRouter(request, reply) {
      // Send to workers
      try {
        if (S === W || S === C_W) {
          await pool.exec()
        } else {
          bench(100)
        }
      } catch (e) {
        console.log(e)
        process.exit(0)
      }
      // console.log(result)
      reply.end('OK')
    }

    // Start HTTP server
    const server = http.createServer(router)
    server.listen(port, '0.0.0.0', () => {
      console.log(`Node.js Standard Library HTTP server running on port: http://0.0.0.0:${port}`)
    })
  }
}

start().then().catch()
