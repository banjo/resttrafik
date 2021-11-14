# Resttrafik

## Prisma commands

```bash
# migration for database
npx prisma migrate dev --name init

# generate js files
npx prisma generate
```

## Setup database

1. make sure to use `db` as host in the database url.
2. Run `docker-compose up --build`
3. Change temporarily from `db` to `localhost`.
4. Run `npx prisma migrate dev` on host machine to migrate database
5. Change back to `db`.

Alternatively, start the docker-compose build and run the `migrate.sh` file.

## Run application

Change directory to docker directory.

```
docker-compose up --build -d
```