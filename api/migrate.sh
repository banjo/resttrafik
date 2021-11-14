#!/bin/sh

if [ "$(uname)" == "Darwin" ]; then
    sed -i '' 's/db/localhost/g' ./prisma/.env
    npx prisma migrate dev
    sed -i '' 's/localhost/db/g' ./prisma/.env
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    sed -i 's/db/localhost/g' ./prisma/.env
    npx prisma migrate dev
    sed -i 's/localhost/db/g' ./prisma/.env
fi
