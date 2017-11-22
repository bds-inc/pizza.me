module.exports = {
  dev: {     
     database:'pizzame',
     user:'pizzauser',     
     password: process.env.password || 'bdsinc@koding',
     options: {
      dialect: 'postgres',
      host:'localhost',
      port:5432,
      ssl: process.env.ssl || true,
     }
     
  },
  prod: {     
     database: process.env.database || 'pizzame',
     user: process.env.user || 'pizzauser',
     password: process.env.password || 'bdsinc@koding',
     options: {
      dialect: 'postgres',
      host:'localhost',
      port:5432,
      ssl: process.env.ssl || true,
     }     
  }
}
