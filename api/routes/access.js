var express = require('express');
var router = express.Router();
var request = require('sync-request');

const fs = require('fs');

const clientId = process.env.MEETUP_CLIENT_ID;
const clientKey = process.env.MEETUP_CLIENT_KEY;
const email = process.env.MEETUP_EMAIL;
const pw = process.env.MEETUP_PW;

const baseUrl = 'https://secure.meetup.com/oauth2/access';
const redirect_uri = 'http://localhost:3000/access/';
const eventsUrl = 'https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&page=10000';
const sessionUrl = `https://api.meetup.com/sessions?&email=${email}&password=${pw}`

let oauthToken;
let accessToken;

router.get('/', function (req, res, next) {
  if (req.query.code) {
    // Request access token
    const requestUrl = `${baseUrl}?client_id=${clientId}&client_secret=${clientKey}&grant_type=anonymous_code&redirect_uri=${redirect_uri}&code=${req.query.code}`;
    const accessTokenResponse = request('POST', requestUrl, {
      headers: {
        accept: 'application/json'
      },
    });
    const accessJsonBody = JSON.parse(accessTokenResponse.body);
    console.log(requestUrl);
    console.log('Access token granted: ', accessJsonBody);
    console.log('access token in request: ', accessJsonBody.access_token);
    accessToken = accessJsonBody.access_token;

    // Insert credentials
    const credentialsResponse = request('POST', sessionUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    const credentialsJsonBody = JSON.parse(credentialsResponse.body);
    oauthToken = credentialsJsonBody.oauth_token;
    console.log('OAUTH TOKEN: ', oauthToken);

    // Get events
    const eventsResponse = request('GET', eventsUrl, {
      headers: {
        Authorization: `Bearer ${oauthToken}`,
      }
    });
    const events = JSON.stringify(eventsResponse.getBody('utf8'));
    const parsedEvents = JSON.parse(events);
    console.log(parsedEvents);

    fs.writeFile('events.json', parsedEvents, (err) => {
      if (err) throw err;
    });

  }

  res.render('access', { title: 'Event was successfully fetched from Meetup API, and can be found in api/events.json' });

});

module.exports = router;