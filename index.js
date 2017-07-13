'use strict';

const http = require('http');
const url = require('url');
const port = Number(process.env.PORT || 8000);

const routes = {
  '/': index,
};

function route(path, response) {
  if (typeof routes[path] === 'function') {
    routes[path](response);
  } else {
    console.log('No request handler found for ', path);
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('I do not exist.');
    response.end();
  }
}

/* Controllers */
function index(response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('I wanna be an awesome page when I grow up.');
  response.end();
}

function onRequest(request, response) {
  const path = url.parse(request.url).pathname;
  route(path, response);
}

http.createServer(onRequest).listen(port);
