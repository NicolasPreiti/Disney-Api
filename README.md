# Disney-API
API developed with NodeJS with which we can explore the amazing world of disney.

## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:

if you dont have a database yet, run this:
``` bash
npx sequelize-cli db:create
```

then run migrations
``` bash
npx sequelize-cli db:migrate
```
