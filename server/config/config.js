module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "kanban",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "rwlotdzbqngpcb",
    "password": "d2bcefc258df631e8b798c7d25fbfdc6cdc17d59beb491981b373ab2512f2943",
    "database": "d2pvppoqpsqmp0",
    "host": "ec2-52-45-14-227.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
