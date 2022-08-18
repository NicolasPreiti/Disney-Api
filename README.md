# Disney-Api
Api desarrollada en NodeJs para explorar el mundo de Disney.

## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:

if you not have a database yet, run this:
``` bash
npx sequelize-cli db:create
```

else run the migrations
``` bash
npx sequelize-cli db:migrate
```
