var request = require('request')
  , htmlparser = require('htmlparser2')
  , parseHttpHeader = require('parse-http-header');

var feedTypes = [
  'text/xml',
  'application/rss+xml',
  'application/atom+xml',
  'application/rdf+xml'
];

module.exports = function (options, cb) {
  var discovered = []
    , contentType = ''
    , url = 'string' === typeof options ? options : (options.url || options.uri)
    , errored = false;

  var req = this._request = request(options)
    , parser = this._parser = new htmlparser.Stream();

  req.on('error', onEnd);
  req.on('abort', function () {
    req.removeAllListeners();
    req.destroy();
  });
  req.on('response', function (response) {
    if (response.statusCode !== 200) {
      var err = new Error(req.httpModule.STATUS_CODES[response.statusCode] || 'Unknown HTTP response');
      err.code = response.statusCode;
      return onEnd(err);
    }

    if (response.headers['content-type']) {
      contentType = parseHttpHeader(response.headers['content-type'])[0];
    }

    if (~feedTypes.indexOf(contentType)) {
      discovered.push({
        rel: 'self',
        type: contentType,
        href: url
      });
      req.abort();
      onEnd();
    }
    else {
      req.pipe(parser);
    }
  });

  parser.on('error', onEnd);
  parser.on('finish', onEnd);

  parser.on('opentag', function openHeadHandler (name) {
    if (name === 'head') {
      parser.removeListener('opentag', openHeadHandler);
      parser.on('opentag', linkHandler);
      parser.on('closetag', closeHeadHandler);
    }
    function linkHandler (name, attribs) {
      if (name === 'link' && attribs && attribs.rel && attribs.rel === 'alternate') {
        discovered.push(attribs);
      }
    }
    function closeHeadHandler (name) {
      if (name === 'head') {
        parser.removeListener('opentag', linkHandler);
        parser.removeListener('closetag', closeHeadHandler);
        req.abort();
        parser._parser.pause();
        parser.end();
      }
    }
  });

  function onEnd (err) {
    if (errored) return;
    if (err) {
      errored = true;
      cb(err);
    }
    else {
      cb(null, { 'content-type': contentType, 'links': discovered });
    }
  }

  return this;
};
