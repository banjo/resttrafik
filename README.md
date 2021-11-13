# Resttrafik

## Setup database

```bash
# cd into prisma folder
npx prisma migrate dev --name init

npx prisma generate
```

## Run application

Change directory to docker directory.

```
docker-compose up --build -d
```