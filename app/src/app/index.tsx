import React, { useEffect, ChangeEvent } from 'react';
import shallow from 'zustand/shallow';
import ky from 'ky';
import { useForm, FormProvider } from 'react-hook-form';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import AppBar from './app-bar';
import PostURL from './post-url';
import FormNumber from '../components/form-number';
import FormPlayerNumber from '../components/form-player-number';
import Bonus from './bonus';
import { formatBody, DataInterface } from './helpers';
import { useAppStore } from '../store';

//---------------------------------------------------------------------

type ResultsResponse = {
  data: string;
};

function App() {
  const { loading, results, setLoading, setResults } = useAppStore(
    (state) => ({
      loading: state.loading,
      results: state.results,
      setLoading: state.setLoading,
      setResults: state.setResults,
    }),
    shallow
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResults(e.target.value);
  };

  const onSubmit = async (formData: DataInterface) => {
    setLoading(true);
    try {
      const { data }: ResultsResponse = await ky
        .post('/api/results', {
          json: formatBody(formData),
        })
        .json();
      setResults(data);
    } catch (e) {
      console.log(e); // eslint-disable-line
    }

    setLoading(false);
  };

  const methods = useForm();

  return (
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
            value={loading ? 'Loading...' : results}
            onChange={handleOnChange}
            disabled={loading}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}

//---------------------------------------------------------------------

export default App;
