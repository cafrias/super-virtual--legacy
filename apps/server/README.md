# Super Virtual

> API Service

This is the API service for the Super Virtual application.

## Start Development Environment

When starting for the first time:

1. Start the Docker services running `npm run services:start`
2. In another terminal, run the shell script `start-replica.sh` to configure the MongoDB Replica Set for the first time.

Once the configuration of the replica set is up, unless the containers are scrapped, there won't be any need to run the step 2 anymore, so on subsequent runs executing `npm run services:start` should be enough.
