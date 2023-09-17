function createGateway(ctx) {
    return function gateway(clientRequest, clientResponse) {
      const body = clientRequest.body || '';
      const query = clientRequest.method == 'POST' ? new URLSearchParams((body || '').toString()) : new URLSearchParams((clientRequest.url.split('?')[1] || ''));
    console.log(query.get('url'))
      if (!query.has('url')) return clientResponse.end();
      const url = query.get('url');
      if (/https?:\/\/([a-zA-Z0-9\-\_])|([a-zA-Z0-9\-\_])\.([a-zA-Z])/.test(url)) {
          clientResponse.writeHead(301, { Location: ctx.url.wrap(/https?:\/\//.test(url) ? url : 'http://' + url) });
          clientResponse.end();
      } else {
          clientResponse.writeHead(301, { Location: ctx.url.wrap('https://www.google.com/search?q=' + url) });
          clientResponse.end();
      };
    };
};
module.exports = createGateway;