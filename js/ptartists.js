var get = function(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

var renderGraph = function() {
  var cy = window.cy = cytoscape({
    container: $('#cy'),

    boxSelectionEnabled: false,
    autounselectify: true,

    layout: {
      name: 'cose-bilkent'
    },

    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#ad1a66'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#ad1a66'
        }
      }
    ],
    elements: get('data/artists.json').then(JSON.parse)
  });
}
