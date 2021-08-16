# memocards

![example workflow](https://github.com/karmek-k/memocards/actions/workflows/server.yml/badge.svg)

## Overview

**memocards** is a flashcard application, intended to be used for effective memorization.

The app is not finished yet, but development is nearing the end
and it will be available soon! :)

For now, you can follow the instructions below to set up a development environment.

## Setting up (for development)

memocards uses [Yarn](https://yarnpkg.com/) for package management, so you should install it first:

```
npm install -g yarn
```

### Backend - with Docker

Create a new `.env` file from template:

```
cp .env.template .env
```

Edit it to your needs (or don't edit it at all, if you're just trying this out).

Run Docker Compose:

```bash
# in foreground (exit with ctrl+c)
docker-compose up

# in background
docker-compose up -d
```

To stop compose running in background when you're done, run:

```bash
# you must be in the same directory as before
docker-compose stop
```

### Frontend - without building for deployment

Follow the `README.md` file in the `client` directory.
You should have the backend running already.

## Running tests

Go to the `server` directory and install the dependencies:

```
cd server
yarn
```

And then, simply run:

```
yarn test
```

For test coverage:

```
yarn test --coverage
```

## Author and license

Developed by **Bartosz Gleń** and available under the **GNU AGPL 3** license.
