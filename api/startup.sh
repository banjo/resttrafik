#!/bin/sh
npx pm2 start "NODE_ENV=production node ./dist/worker/index.js"
npx pm2 start "NODE_ENV=production node ./dist/src/index.js"
npx pm2 logs
