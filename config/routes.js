'use strict';

let host = 'localhost';

const thorneyPort = 3000;
const legacyPort = 80;

if (typeof process.env.THORNEY_HOST !== 'undefined' && process.env.THORNEY_HOST !== '') {
  host = process.env.THORNEY_HOST;
}

// Configure the proxy routes - these should point to where your back end applications run
module.exports = {
  localhost: {
    default: {
      host: host,
      port: 5401
    }
  },
  'beta.parliament.uk':     generateProxyTargets('thorney.web1live.org', 'varnish.web1live.org', false),
  'devci.parliament.uk':    generateProxyTargets('thorney.web1devci.org', 'varnish.web1devci.org', true),
  'augustus.pdswebops.org': generateProxyTargets('thorney.pdswebops.org', 'varnish.pdswebops.org', true)
};

function generateProxyTargets (thorneyHost, legacyHost, includePrototypes) {
  let routes = {
    // Match requests to / for the home page and allow an optional json=true parameter
    '/^\\/?(\\?json=true)?$/': {
      host: thorneyHost,
      port: thorneyPort
    },

    // Match requests to /groups
    '/^\\/groups/': {
      host: thorneyHost,
      port: thorneyPort
    },

    // Match requests to /proposed-negative-statutory-instruments
    '/^\\/proposed-negative-statutory-instruments/': {
      host: thorneyHost,
      port: thorneyPort
    },

    // Match requests to /statutory-instruments
    '/^\\/statutory-instruments/': {
      host: thorneyHost,
      port: thorneyPort
    },

    // Match requests to /search
    '/^\\/search/': {
      host: thorneyHost,
      port: thorneyPort
    },

    // Match requests to /procedure-steps
    '/^\\/procedure-steps/': {
      host: thorneyHost,
      port: thorneyPort
    },

    // Match requests to /laying-bodies
    '/^\\/laying-bodies/': {
      host: thorneyHost,
      port: thorneyPort
    },

    // Match requests to /laid-papers
    '/^\\/laid-papers/': {
      host: thorneyHost,
      port: thorneyPort
    },

    // Match requests to /procedures
    '/^\\/procedures/': {
      host: thorneyHost,
      port: thorneyPort
    },

    // Match requests to /work-packages/current
    '/^\\/work-packages/current/': {
      host: thorneyHost,
      port: thorneyPort
    },

    // Match requests to /work-packages/paper-types/
    '/^\\/work-packages/paper-types/': {
      host: thorneyHost,
      port: thorneyPort
    },

    // Match requests to /houses/<8_character_alphanumeric_id>/made-available/
    '/^\\/houses\\/[a-zA-z0-9]{8}\\/made-available/': {
      host: thorneyHost,
      port: thorneyPort
    },

    // Match requests to /treaties
    '/^\\/treaties/': {
      host: thorneyHost,
      port: thorneyPort
    },

    // All other requests go here
    default: {
      host: legacyHost,
      port: legacyPort
    }
  };

  if(includePrototypes) {
    routes['/^\\/committee-prototype/'] = {
      host: thorneyHost,
      port: thorneyPort
    };
  }

  return routes;
}
