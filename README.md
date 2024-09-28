<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Description

Backend server for Velaio Team. This is a technical test. Created by developer: Onier Crestelo Ojeda

# Database information

I use here MariaDB inside the docker network so MariaDB is free and it is better MySql solution today.
The Network is created between the velaio-server app and velaio-mariadb (database runnning).

# Note

You need to have installed docker app or binary package on your PC to run this docker image

# Steps to running the server on development mode

1. Clone the repository `git clone <url>`
2. Replace the `.env.example` to `.env` file and configure the environment variables
3. Create, run and start the container image with the command `docker compose -f docker-compose.dev.yml up -d`
4. Enter to velaio-server container `docker exec -it velaio-server /bin/sh`
5. Generate entities in database inside the container, run this command `npm run migration:run`

## Installations

1. @nestjs/config so can use ConfigModule

```
npm i @nestjs/config
```

2. @nestjs/typeorm and typeorm

```
npm i @nestjs/typeorm typeorm
```

3. mysql

```
npm i mysql
```

4. class-validator class-transformer ( to validate all data passed by Frontend )

```
npm i class-validator class-transformer
```

5. To enable better type safety, let’s install the multer types package.

```
npm i -D @types/multer
```

6. Mapped Types to update a dto

```
npm i @nestjs/mapped-types
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
