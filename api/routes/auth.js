var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/', function (req, res, next) {
  const clientId = process.env.MEETUP_CLIENT_ID;
  const clientKey = process.env.MEETUP_CLIENT_KEY;
  const requestUrl = `https://secure.meetup.com/oauth2/authorize?client_id=${clientId}&client_secret=${clientKey}&response_type=code&redirect_uri=http://localhost:3000/access/`;
  let options = {
    url: requestUrl,
    headers: {
      accept: 'application/json'
    }
  };

  request.get(options).pipe(res);
});

module.exports = router;