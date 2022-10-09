import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useForm, FormProvider } from 'react-hook-form';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import AppBar from '../app-bar';
import PostURL from '../post-url';
import FormNumber from '../form-number';
import FormPlayerNumber from '../form-player-number';
import Bonus from '../bonus';
import { RosterContext, ResultContext, LoadingContext } from '../../contexts';
import { formatBody, DataInterface } from './helpers';

//---------------------------------------------------------------------

function App() {
  const [roster, setRoster] = useState({});
  const [result, setResult] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const onSubmit = async (formData: DataInterface) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/results',
        formatBody(formData)
      );
      setResult(data);
    } catch (e) {
      console.log(e); // eslint-disable-line
    }

    setLoading(false);
  };

  const methods = useForm();

  return (
    <RosterContext.Provider value={roster}>
      <ResultContext.Provider value={{ result, setResult }}>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <FormProvider {...methods}>
            <AppBar />
            <PostURL />
            <Divider sx={{ m: 1, my: 2 }} />
            <Grid container spacing={2} justifyContent="flex-start">
              <Grid sx={{ m: 1 }} item xs={12} lg={5} minWidth={550}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                  <LoadingButton
                    sx={{ mt: 1 }}
                    variant="contained"
                    loading={loading}
                    type="submit"
                  >
                    Submit
                  </LoadingButton>
                </form>
              </Grid>
              <Grid item xs={12} lg={5} sx={{ pr: 1, mt: 2 }}>
                <TextField
                  multiline
                  fullWidth
                  rows={30}
                  placeholder="Results appear here"
                  value={result}
                  onChange={handleOnChange}
                  disabled={loading}
                />
              </Grid>
            </Grid>
          </FormProvider>
        </LoadingContext.Provider>
      </ResultContext.Provider>
    </RosterContext.Provider>
  );
}

//---------------------------------------------------------------------

export default App;
