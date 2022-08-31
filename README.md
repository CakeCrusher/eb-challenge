# Sebastian Sosa - Energy.bot challenge

## Setup

(steps 1-3 are an unforunate part of the process as the [backend/api](energybot) container was not able to mount)

1. run `npm i`.
2. run `npm run download`
3. Run `docker-compose up`.
4. wait ~8min while the climate data is uploaded to the database (1.5gb climate file is heavy). Once its finished you will see `ebapi | Connection has been established successfully.`
5. navigate to http://localhost:3000 and start browsing 🥳.
6. From here on, you can easily start up the application with `docker-compose up`.

## What is going on?

1. A postgres server is initiated with a database.
2. The [backend/api](energybot) image is built and ran.
3. It triggers 2 migrations: one for creating the table and the other for populating it with the climate 2017 data.
4. The api is then ready to serve data at the http://localhost:3001/api/stations for all stations or http://localhost:3001/api/stations/:stationId for a specific station.
5. The data is served lazily enabling for speedy fetches.
6. The [client](dbclient) is ran which provides a simple UI to utilize MOST features provided by the api.
7. You can select to see a specific station or all stations.
8. You may continue loading to your hearts content (within the scope of what your looking for) with the load more button at the bottom.
9. Enjoy the 39 million rows 🤖!

## Next Steps

0. Ensure all of it runs in a simple `docker-compose up` command.
1. Add typing with typescript.
2. Add testing with jest.
3. Integrate CI/CD.
4. Modularize the downloading process.

## Biggest Challenges

- Was not too familiar with ftp system for fetching files.
- Docker wasnt nice tonight.

### All art property of EnergyBot

😬
