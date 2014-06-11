describe('basic', function () {
  var assert = require('assert');
  var discover = require('../');

  it('works an HTML page', function (done) {
    discover('http://yabfog.com/blog', function (err, results) {
      assert.ifError(err);
      assert(results);
      assert.equal(results['content-type'], 'text/html');
      assert.equal(results.links.length, 2);
      done();
    });
  });

  it('works with an RSS feed', function (done) {
    discover('http://yabfog.com/blog/feed', function (err, results) {
      assert.ifError(err);
      assert.equal(results['content-type'], 'text/xml');
      assert.equal(results.links.length, 1);
      done();
    });
  });

});