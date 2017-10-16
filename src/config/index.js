module.exports = {
  dev: {
     host:'localhost',
     port:5432,
     database:'pizzame',
     user:'pizzauser',
     password:'bdsinc@koding'
  },
  prod: {
     host: process.ENV.host || 'localhost',
     port: process.ENV.port || 5432,
     database: process.ENV.database || 'pizzame',
     user: process.ENV.user || 'pizzauser',
     password: process.ENV.password || 'bdsinc@koding',
     ssl: process.ENV.ssl || true
  }
}
