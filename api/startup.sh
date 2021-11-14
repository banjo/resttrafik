#!/bin/sh
npx pm2 start "node ./dist/worker/index.js"
npx pm2 start "node ./dist/src/index.js"
npx pm2 logs
