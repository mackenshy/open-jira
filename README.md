# NExtjs OpenJira App
To run locally is necessary starting database:
```
docker-compose up -d
```

* -d, means __detached__

MongoDB URL local:
```
mongodb://localhost:27017/entriesdb
```

## Set envs
```
MONGO_URL=
```

## Install and start project
```
yarn install
yarn dev
```

## Seed database
```
http://localhost:3000/api/seed
```