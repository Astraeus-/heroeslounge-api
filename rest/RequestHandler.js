const https = require('https');

/* Heroes Lounge API information */
const VERSION = 'v1';
const BASEURL = 'heroeslounge.gg';
const API = `/api/${VERSION}`;

class RequestHandler {
  constructor() {
    this.resetInterval = 500;
    this.reset = 0;
    this.processing = false;
    this._queue = [];
  }

  request(method, endpoint) {
    const options = {
      hostname: BASEURL,
      path: `${API}${endpoint}`,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return new Promise((resolve, reject) => {
      let attempts = 0;

      const makeRequest = (cb) => {
        const req = https.request(options, (res) => {
          res.setEncoding('utf8');
          let rawResponse = '';
    
          res.on('data', (d) => {
            rawResponse += d;
          });
    
          res.on('end', () => {
            if (res.statusCode === 200) {
              try {
                let response = JSON.parse(rawResponse);
                cb();
                resolve(response);
              } catch (err) {
                cb();
                reject(Error('Parse JSON response'));
              }
            } else if (res.statusCode === 400) {
              cb();
              reject(Error(`Status Code ${res.statusCode}: Value for ${options.path} does not exist`));
            } else if (res.statusCode === 500 && ++attempts < 3) {
              setTimeout(() => {
                makeRequest(cb);
              }, 3000);
              return;
            } else {
              cb();
              reject(Error(`status Code ${res.statusCode}: Invalid request for ${options.path}`));
            }
          });
        });
    
        req.on('error', (error) => {
          cb();
          reject(error);
        });
    
        req.end();
      };

      this._queue.push(makeRequest);
      this.process();
    });
  }

  async reqMulti (type, endpoint, limit) {
    if (typeof limit !== 'undefined' && typeof limit !== 'number') throw TypeError('limit is not of type number');
    if (limit === 0) return [];
  
    let returnData = [];
    let pageData = [];
    let pageDataSize;
    let currentPage;
  
    let nPagesToRequest;
  
    // Initial request.
    const initialRequest = await this.request(type, endpoint).catch((error) => {
      throw error;
    });
  
    pageDataSize = initialRequest.per_page;
    currentPage = initialRequest.current_page;
    nPagesToRequest = limit ? Math.min(Math.max(Math.ceil(Math.abs(limit) / pageDataSize), 1), initialRequest.last_page) : initialRequest.last_page;
  
    if (typeof limit === 'undefined' || limit >= 0) {
      pageData.push(initialRequest);
      for (let i = currentPage + 1; i <= nPagesToRequest; i++) {
        pageData.push(this.request('get', endpoint + '?page=' + i));
      }
    } else if (limit < 0) {
      for (let i = initialRequest.last_page; i > initialRequest.last_page - nPagesToRequest; i--) {
        pageData.push(this.request('get', endpoint + '?page=' + i));
      }
    }
  
    return Promise.all(pageData).then((values) => {
      values.forEach((value) => {
        returnData = returnData.concat(value.data);
      });

      if (returnData.length > Math.abs(limit)) {
        returnData = limit >= 0 ? returnData.slice(0, limit) : returnData.slice(limit, returnData.length);
      }

      return returnData;
    }).catch((error) => {
      throw error;
    });
  }

  process() {
    if (this._queue.length === 0) {
      if (this.processing) {
        this.processing = false;
      }

      return;
    }

    if (this.processing) {
      return;
    }

    const now = Date.now();
    if (!this.reset) {
      this.reset = now;
    } else if (this.reset < now + this.resetInterval) {
      this.reset = now;
    }

    if (this.reset > now) {
      setTimeout(() => {
        this.processing = false;
        this.process();
      }, this.reset - now);
      return;
    }

    this.processing = true;
    const currentRequest = this._queue.shift();
    currentRequest(() => {
      this.processing = false;
      this.process();
    });
  }
}

module.exports = new RequestHandler();
