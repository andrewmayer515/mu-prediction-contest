import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import resultsRouter from './routes/results';
import rosterRouter from './routes/roster';
import totalsRouter from './routes/totals';
import boxscoreRouter from './routes/boxscore';

//---------------------------------------------------------------------

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../app/dist')));
}

app.use(bodyParser.json());
app.use(bodyParser.text({ type: '*/*' }));
app.use(cors());

app
  .use('/api', resultsRouter)
  .use('/api', rosterRouter)
  .use('/api', totalsRouter)
  .use('/api', boxscoreRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});
