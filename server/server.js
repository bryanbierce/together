import Hapi from "hapi";
import Inert from "inert";
import Good from "good";
import GoodConsole from "good-console";
import Path from "path";
import env from "../env.js";

env();

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, "public")
      }
    }
  }
});

server.connection({ port: 4028 });


server.register(Inert, (err) => {
  if (err) throw err;

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "path",
        index: true
      }
    }
  });
});


function startServer() {
  server.start((error) => {
    if (error) throw error;

    console.log("And we're live at: ", server.info.uri);
  });
}

if (process.env.LOCATION === "DEVELOPMENT") {
  server.register({
    register: Good,
    options: {
      reporters: [{
        reporter: GoodConsole,
        events: {
          response: "*",
          log: "*"
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
