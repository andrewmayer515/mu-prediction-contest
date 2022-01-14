/* eslint-disable no-undef */

import express from 'express';
import puppeteer from 'puppeteer';
import _clone from 'lodash.clonedeep';

//---------------------------------------------------------------------

const router = express.Router();

const BOXSCORE_INDEX = {
  PLAYER_NUMBER: 0,
  PLAYER: 1,
  STARTER: 2,
  MINUTES_PLAYED: 3,
  FIELD_GOALS: 4,
  THREE_POINTERS: 5,
  FREE_THROWS: 6,
  REBOUNDS_O_D: 7,
  REBOUNDS: 8,
  FOULS: 9,
  ASSISTS: 10,
  TURNOVERS: 11,
  BLOCKS: 12,
  STEALS: 13,
  POINTS: 14,
};

const totalScore = (marquetteTable, opponentTable) => {
  const marquettePoints =
    marquetteTable[marquetteTable.length - 1][BOXSCORE_INDEX.POINTS];
  const opponentPoints =
    opponentTable[opponentTable.length - 1][BOXSCORE_INDEX.POINTS];

  return Number(marquettePoints) + Number(opponentPoints);
};

const pointsScored = table => {
  const points = table[table.length - 1][BOXSCORE_INDEX.POINTS];

  return Number(points);
};

const totalTurnovers = table => {
  const turnovers = table[table.length - 1][BOXSCORE_INDEX.TURNOVERS];

  return Number(turnovers);
};

const marquetteTotalThrees = table => {
  const threes = table[table.length - 1][BOXSCORE_INDEX.THREE_POINTERS].split(
    '-'
  );

  return Number(threes[0]);
};

const resultRunner = (marquetteTable, opponentTable) => [
  {
    question: 1,
    result: totalScore(marquetteTable, opponentTable),
  },
  {
    question: 2,
    result: pointsScored(marquetteTable),
  },
  {
    question: 3,
    result: pointsScored(opponentTable),
  },
  {
    question: 4,
    result: totalTurnovers(opponentTable),
  },
  {
    question: 5,
    result: totalTurnovers(marquetteTable),
  },
  {
    question: 6,
    result: marquetteTotalThrees(marquetteTable),
  },
];

const boxscoreData = async url => {
  const browser = await puppeteer.launch({
    args: ['about:blank'],
  });

  const [page] = await browser.pages();
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.bringToFront();

  const isMUHome = await page.evaluate(
    () =>
      !document.querySelector('.sub-heading').textContent.includes('Marquette')
  );

  const awayBox = await page.evaluate(() =>
    [...document.querySelectorAll(`#DataTables_Table_0 tr`)].map(row => {
      const split = row.innerText.split('\t');
      const updated = split.map(el => el.trim());

      return updated;
    })
  );
  const homeBox = await page.evaluate(() =>
    [...document.querySelectorAll(`#DataTables_Table_1 tr`)].map(row => {
      const split = row.innerText.split('\t');
      const updated = split.map(el => el.trim());

      return updated;
    })
  );

  const marquetteTable = isMUHome ? _clone(homeBox) : _clone(awayBox);
  const opponentTable = isMUHome ? _clone(awayBox) : _clone(homeBox);

  return { marquetteTable, opponentTable };
};

router.get('/boxscore', async (req, res) => {
  const { url } = req.query;

  const { marquetteTable, opponentTable } = await boxscoreData(url);
  const results = resultRunner(marquetteTable, opponentTable);

  res.send(results);
});

export default router;
