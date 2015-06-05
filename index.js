var path = require('path');
var fs = require('fs');
var server = require('http').createServer(handler);

var mime = {
    'css'   : 'text/css',
    'html'  : 'text/html',
    'png'   : 'image/png',
    'js'    : 'application/javascript',
    'woff'  : 'application/x-font-woff'
};

function handler(req, res) {
    var url = (req.url.split('?')[0]).substr(1);
    if (url == '') url = 'index.html';

    var exploded = url.split('.');
    var contentType = mime[exploded[exploded.length - 1]] || 'application/octet-stream';

    res.setHeader('Content-Type', contentType);
    console.log('GET', url);

    fs.readFile(
      path.join(process.cwd(), url),
        function (err, data) {
            if (err) {
                res.writeHead(404);
                return res.end('Error loading ' + url);
            }
            res.writeHead(200);
            res.end(data);
        }
    );
}

server.listen(process.env.PORT || 5000);
