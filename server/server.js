const Hapi = require('hapi');
const Inert = require('inert');
const Good = require('good');
const GoodConsole = require('good-console');
const Path = require('path');
const env = require('../env.js');

if(process.env.LOCATION === undefined) {
  env();
}

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, '../public')
      }
    }
  }
});

server.connection({ port: 4028 });


server.register(Inert, (err) => {
  if (err) throw err;

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: './',
        redirectToSlash: true,
        index: true
      }
    }
  });
});


function startServer() {
  server.start((error) => {
    if (error) throw error;

    console.log('And we\'re live at: ', server.info.uri);
  });
}

if (process.env.LOCATION === 'DEVELOPMENT') {
  server.register({
    register: Good,
    options: {
      reporters: [{
        reporter: GoodConsole,
        events: {
          response: '*',
          log: '*'
        }
      }]
    }
  }, (err) => {
    if (err) throw err;

    startServer();
  });
} else {
  startServer();
}
