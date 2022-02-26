import React, { useContext } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import shallow from 'zustand/shallow';

import { ResultContext, LoadingContext } from '../../contexts';
import useStore from '../../store';
import { formatBody } from './helpers';

//---------------------------------------------------------------------

const Submit = () => {
  const [questions, url, bonus] = useStore(
    state => [state.questions, state.url, state.bonus],
    shallow
  );
  const { setResult } = useContext(ResultContext);
  const { loading, setLoading } = useContext(LoadingContext);

  const handleClick = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/results',
        formatBody(questions, bonus, url)
      );
      setResult(data);
    } catch (e) {
      console.log(e); // eslint-disable-line
    }

    setLoading(false);
  };

  return (
    <div>
      <LoadingButton
        sx={{ mt: 1 }}
        variant="contained"
        loading={loading}
        onClick={handleClick}
      >
        Submit
      </LoadingButton>
    </div>
  );
};

export default Submit;
