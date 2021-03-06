'use strict';

const debug = require('debug')('cfgram:auth-routes');
const basicAuth = require('../lib/basic-auth-middleware');
const authController = require('../controller/auth-controller');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    debug('POST /signup');

    return authController.createNewUserPass(req.body)
    .then(token => res.json(token))
    .catch(err => res.status(400).send(err));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('GET /signin');

    return authController.authUser(req.auth)
    .then(token => res.json(token))
    .catch(err => res.status(401).send(err));
  });


  return router;
};
