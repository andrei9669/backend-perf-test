# NODE benchmark
The aim of this repo is to demonstrate performance when running node in different modes.

For best and most accurate results, it is recommended to run configuration and test on separate machines.

TODO: 
- Explore options to run test not on artillery because it hogs lots of resources.
- Increase test duration and load.
- Create better template for results.
- Create more "interesting" load tests to increase the calculation load.

##Configurations
There are 4 possible configurations:
1. single core `npm run start`
2. max cores using clusters `npm run start-c`
3. 15 threads using worker threads `npm run start-w`
4. combining clusters and worker threads `npm run start-cw`

## Testing
By using artillery package, we can load-test the endpoint.

### Steps
1. Select a configuration to run.
2. Run command `npm run test`.

### Credits

Original code is from here: https://blog.usejournal.com/go-goroutines-vs-node-cluster-worker-threads-part-2-52611217340a
