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

## Migrate

1. Update `prisma.schema` file.
2. Start application like usual: `docker-compose up --build` 
3. Follow the steps on `Setup Database` above.
   1. Run the application
   2. Change db connection string host to localhost
   3. Run migration script
   4. change back

## Run application

Change directory to docker directory.

```bash
# build in detached mode
docker-compose up --build -d

# see logs
docker-compose logs

# stop the application
docker-compose down --remove-orphans
```

## Env variables

All env variables are currently located in the .env file in the `api` folder and the `prisma` folder. Update those if you want to change the program.

## Access database

SSH into the host server and expose port 5002 through the connection, that way you can access adminer locally.

Update `~./.ssh/config` and add something like this:

```
Host hetzner
HostName 65.108.94.80
User root
ForwardAgent yes
LocalForward localhost:6002 localhost:5002
```

Access it with `ssh hetzner` in this case.