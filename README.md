# RSS Discovery (node-rssdiscovery)

Automatically find a site's RSS/Atom/RDF feed(s), given a url. The url is
expected to be a link to an html page containing [RSS Autodiscovery](http://www.rssboard.org/rss-autodiscovery)
links, but a link to the feed should work, too.

This is a streaming parser -- we **DO NOT** buffer the entire page (or feed)
into memory. And rather than parse the entire page (or feed), we abort parsing
as soon as we have the information we need. In the case of an html page, we
abort as soon as we see the closing `</head>` tag. In the case of a feed, we
abort without parsing any of the response body (i.e., immediately upon parsing
the response headers). The expectation (untested) is that this will be faster
when a page or feed is large. YMMV.

## Usage

```js
var discover = require('rssdiscovery');
discover(<some url>, function (err, results) {
  // results is an object with the properties:
  // - content-type: the Content-Type (MIME type) as reported by the remote server (if any; could be an empty string)
  // - links: an Array of objects having the following properties, each representing an auto-discovered link
  //   - rel: 'alternate' or 'self' (the latter meaning the given url was a feed)
  //   - href: the link to the feed
  //   - type: the feed's MIME type
  //   - title: the feed's or site's title (optional)
});
```

- - -
### Developed by [TerraEclipse](https://github.com/TerraEclipse)

Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Santa Cruz, CA and Washington, D.C.

- - -

### License: BSD
Copyright (C) 2014 Terra Eclipse, Inc. ([http://www.terraeclipse.com](http://www.terraeclipse.com))
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of Terra Eclipse, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
