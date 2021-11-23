/* eslint-disable no-await-in-loop, no-loop-func, no-undef */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import resultsRouter from './routes/results';
import rosterRouter from './routes/roster';
import totalsRouter from './routes/totals';

//---------------------------------------------------------------------

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.text({ type: '*/*' }));
app.use(cors());

app
  .use('/api', resultsRouter)
  .use('/api', rosterRouter)
  .use('/api', totalsRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});
