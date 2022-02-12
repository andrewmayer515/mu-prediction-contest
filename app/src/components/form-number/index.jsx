import React from 'react';
import PropTypes from 'prop-types';
import shallow from 'zustand/shallow';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import useStore from '../../store';

//---------------------------------------------------------------------

const FormNumber = ({ label, order, overrideDefault }) => {
  const [updateQuestion, questions] = useStore(
    state => [state.updateQuestion, state.questions],
    shallow
  );

  const handleOnChange = e => {
    const number = parseInt(e.target.value, 10);

    if (overrideDefault) {
      overrideDefault(number);
    } else {
      updateQuestion({ order, answer: number });
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { my: 1, minWidth: 250 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        onChange={handleOnChange}
        value={order ? questions[order - 1].answer : ''}
      />
    </Box>
  );
};

FormNumber.propTypes = {
  label: PropTypes.string.isRequired,
  order: PropTypes.number,
  overrideDefault: PropTypes.func,
};

export default FormNumber;
