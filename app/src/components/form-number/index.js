import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { ResultContext, SetResultContext } from '../../contexts';

//---------------------------------------------------------------------

const FormNumber = ({ label, order }) => {
  const results = useContext(ResultContext);
  const setResults = useContext(SetResultContext);

  const handleChange = e => {
    setResults({
      ...results,
      [order]: { text: `${label}:`, answer: e.target.value, type: 'number' },
    });
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, minWidth: 250 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label={label} variant="outlined" onChange={handleChange} />
    </Box>
  );
};

export default FormNumber;