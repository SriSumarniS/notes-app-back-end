const Hapi = require('@hapi/hapi');
const routes = require('./routes'); // import routes
 
 
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    // host: 'localhost',
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0', // mengatasi masalah ip
    routes: {
      cors: {
         origin: ['*'],
      },
    }, // konfigurasi origin
  });

  server.route(routes);
 
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
 
init();