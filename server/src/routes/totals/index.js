import express from 'express';
import fs from 'fs';

//---------------------------------------------------------------------

const router = express.Router();

const output = text => {
  fs.appendFileSync('totals.txt', `${text}\n`);
};

function getTotals(input) {
  const data = input.split('\n');
  // Remove blank spaces AND
  // Replace last dash with uncommon character, some users have names with dashes in them
  const formattedData = data.map(item => {
    const replacement = item
      .replace(/\s/g, '')
      .replace(/-(?!.*-)/, '^')
      .split('^');
    replacement[1] = parseInt(replacement[1], 10);
    return replacement;
  });

  // Sum totals from duplicate usernames
  const counts = {};
  formattedData.forEach(item => {
    if (counts[item[0]]) {
      const sum = counts[item[0]] + item[1];
      counts[item[0]] = sum;
    } else {
      counts[item[0]] = item[1]; // eslint-disable-line prefer-destructuring
    }
  });

  // Sort results, order from most duplicates to fewest
  const sortedResults = [];
  Object.keys(counts).forEach(item => {
    sortedResults.push([item, counts[item]]);
  });

  sortedResults.sort((a, b) => a[1] - b[1]).reverse();

  // Create result file
  fs.writeFileSync('totals.txt', '');
  output('Season Totals:');
  output('------------------');

  sortedResults.forEach(result => output(`${result[0]} - ${result[1]}`));

  const result = fs.readFileSync('totals.txt', 'utf8');
  // Cleanup
  fs.unlinkSync('totals.txt');

  return result;
}

router.post('/totals', async (req, res) => {
  try {
    res.send(getTotals(req.body));
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    res.status(500);
    res.send({ error: e.message });
  }
});

//---------------------------------------------------------------------

export default router;
