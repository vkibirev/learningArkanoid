const http = require('http');

function listener(request, response) {
    console.log(request.url);
    switch(request.url) {
        case '/hello':
            response.write('<h1>Hello</h1>');
            break;
        case '/bye':
            response.write('<h1>Bye</h1>');
            break;
        default:
            response.write('<h1>Default</h1>');
    }

    response.write('<h1>Hello</h1>');
    response.end();
}

const server = http.createServer(listener);

server.listen(8080);
