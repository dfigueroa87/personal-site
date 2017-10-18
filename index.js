'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const port = Number(process.env.PORT || 8000);

const routes = {
  '/': index,
};

function route(path, response) {
  if (typeof routes[path] === 'function') {
    routes[path](response);
  } else {
    // console.log('No request handler found for ', path);
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('I do not exist.');
    response.end();
  }
}

/* Controllers */
function index(response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  fs.createReadStream('./public/index.html').pipe(response);
  // response.write('I wanna be an awesome page when I grow up.');
  // response.end();
}

function onRequest(req, res) {
  // const path = url.parse(request.url).pathname;
  // route(path, response);
  // console.log(`${req.method} ${req.url}`);
  // parse URL
  const parsedUrl = url.parse(req.url);
  // extract URL path
  let pathname = `.${parsedUrl.pathname}`;
  // maps file extention to MIME types
  const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
  };
  fs.exists(pathname, function (exist) {
    if(!exist) {
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }
    // if is a directory, then look for index.html
    if (fs.statSync(pathname).isDirectory()) {
      pathname += '/index.html';
    }
    // read file from file system
    fs.readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
        const ext = path.parse(pathname).ext;
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
        res.end(data);
      }
    });
  });
}

http.createServer(onRequest).listen(port);
