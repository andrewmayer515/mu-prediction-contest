# mu-prediction-contest
![example workflow](https://github.com/andrewmayer515/mu-prediction-contest/actions/workflows/build.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/andrewmayer515/mu-prediction-contest/badge.svg)](https://coveralls.io/github/andrewmayer515/mu-prediction-contest)

![Screenshot](https://i.ibb.co/YkRsNfG/Screenshot.jpg)

A web app that scrapes the content of [muscoop.com](https://www.muscoop.com/) using [Puppeteer](https://github.com/GoogleChrome/puppeteer#readme) to calculate prediction contest winners.

## Rules
For this project, I based the prediction contest rules off of [this muscoop.com post](https://www.muscoop.com/index.php?topic=10.0).

Additionally,
* Copy/paste the format in the original post
* All answers must be written next to the question being asked (to the right of the colon)
* If a question asks for a player name, do not use nicknames (use a combination of player first and/or last name)
  * Acceptable: Markus, Howard, Markus Howard, or MHoward
* Do not 'Quote' another users prediction

## Setup
Download the latet LTS version of [Node](https://nodejs.org/en/), then run the following:
```
$ git clone https://github.com/andrewmayer515/mu-prediction-contest.git
$ cd mu-prediction-contest
$ npm i
```

## Start
Run the following command to build the UI and start the server (opens on http://localhost:8080):
```
$ npm start
```

## Demo
With the app launched, opening the menu and clicking on **Demo** calculates and displays the results from  [the 2013 NCAA Tournament game against Davidson](https://www.muscoop.com/index.php?topic=37247.0).

## Maintenance
Since some of the questions may refer to an individual player on the roster, the roster found in [server/config/roster.js](https://github.com/andrewmayer515/mu-prediction-contest/blob/master/server/config/roster.js) will need to be updated with the player names in a given year.

If a player has a nickname or alias they go by, to have the name included it can be added to the `ALIAS` object. The `key` being the name of the player, `value` being an array of aliases. 

```javascript
ALIAS: {
  'Olivier-Maxence Prosper': ['OMP', 'OMax'],
},
```
