# Resttrafik

![resttrafik page](https://i.imgur.com/fBjdIF2.png)

> This project is no longer hosted online

Resttrafik is a side project of mine. It uses the Swedish `tagtider` API to fetch the train schedule and save all the late/canceled trains to a database. A simple web page is used to preview the data.

It was an attempt from my side to create a full-stack app and host it myself, merely for practicing. This project is not under active maintenance and might not work by the time this is read. 

## Technologies used

* Node
* TypeScript
* Express
* Docker
* Docker-compose
* Prisma
* Postgres
* Nginx
* React
* Tailwind
* Firebase (for auth)
* Ubuntu
* PM2


## How it works

Everything is hosted on a single Ubuntu instance using docker-compose. API, web and a worker (all written in TypeScript). 

The web worker runs once every minute to fetch the train schedule based on the parameters you've defined. It saves the ones that follow the defined rules in a Postgres database using Prisma. 

To access the data a React page is served which uses Firebase to authenticate the user. It's free to use, you just need to sign in with Google.

Nginx is used as a reverse proxy. 

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
# build in detached mode (for development, web app separetly)
docker-compose up --build -d

# build prod
docker-compose -f docker-compose.prod.yml up --build -d

# see logs
docker-compose logs

# stop the application
docker-compose down --remove-orphans
```

Currently, the variables the separate the build are in `.env` and `.env.prod`.

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

## Setup nginx

Nginx is used as a reverse proxy directly in Ubuntu. You can change config in the `nginx`folder. To use the new config you need to do the following.

```bash
# copy file
cp nginx.conf /etc/nginx/nginx.conf

# restart nginx
sudo systemctl reload nginx
```

Basic commands 

```bash
# status
sudo sustemctl status nginx

# start
sudo systemctl start nginx

# stop
sudo systemctl stop nginx

# restart
sudo systemctl reload nginx

# launch at boot
sudo systemctl enable nginx

# disable at boot
sudo systemctl disable nginx
```
