import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';

import AppBar from '../app-bar';
import PostURL from '../post-url';
import FormNumber from '../form-number';
import FormPlayerNumber from '../form-player-number';
import Bonus from '../bonus';
import Submit from '../submit';
import {
  InputContext,
  RosterContext,
  ResultContext,
  LoadingContext,
} from '../../contexts';

//---------------------------------------------------------------------

const App = () => {
  const [input, setInput] = useState({});
  const [roster, setRoster] = useState({});
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const handleOnChange = e => {
    setResult(e.target.value);
  };

  useEffect(() => {
    async function fetchRoster() {
      const { data } = await axios('http://localhost:3000/api/roster');
      setRoster(data);
    }

    fetchRoster();
  }, []);

  useEffect(() => {
    if (loading) {
      setResult('Loading...');
    }
  }, [loading]);

  return (
    <InputContext.Provider value={{ input, setInput }}>
      <RosterContext.Provider value={roster}>
        <ResultContext.Provider value={{ result, setResult }}>
          <LoadingContext.Provider value={{ loading, setLoading }}>
            <AppBar />
            <PostURL />
            <Divider sx={{ m: 1, my: 2 }} />
            <Grid container spacing={2} justifyContent="flex-start">
              <Grid sx={{ m: 1 }} item xs={12} lg={5} minWidth={550}>
                <FormNumber label="Total Game Points" order={1} />
                <FormNumber label="MU Points" order={2} />
                <FormNumber label="Opponent Points" order={3} />
                <FormNumber label="TO's forced by MU" order={4} />
                <FormNumber label="TO's forced by Opponent" order={5} />
                <FormNumber label="MU total made 3s" order={6} />
                <FormPlayerNumber
                  primaryLabel="MU top scorer"
                  secondaryLabel="How Many?"
                  order={7}
                />
                <FormPlayerNumber
                  primaryLabel="MU top assist man"
                  secondaryLabel="How Many?"
                  order={8}
                />
                <FormPlayerNumber
                  primaryLabel="MU top rebounder"
                  secondaryLabel="How Many?"
                  order={9}
                />
                <FormPlayerNumber
                  primaryLabel="MU top 3-point shooter"
                  secondaryLabel="How Many?"
                  order={10}
                />
                <Bonus />
                <Submit />
              </Grid>
              <Grid item xs={12} lg={5} sx={{ pr: 1, mt: 2 }}>
                <TextField
                  multiline
                  fullWidth
                  minRows={30}
                  placeholder="Results appear here"
                  value={result}
                  onChange={handleOnChange}
                  disabled={loading}
                />
              </Grid>
            </Grid>
          </LoadingContext.Provider>
        </ResultContext.Provider>
      </RosterContext.Provider>
    </InputContext.Provider>
  );
};

//---------------------------------------------------------------------

export default App;
