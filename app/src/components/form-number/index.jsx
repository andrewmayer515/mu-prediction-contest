import React from 'react';
import PropTypes from 'prop-types';
import shallow from 'zustand/shallow';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import useStore from '../../store';

//---------------------------------------------------------------------

const FormNumber = ({ label, order, overrideDefault, bonusInputValue }) => {
  const [updateQuestion, questions, bonus] = useStore(
    state => [state.updateQuestion, state.questions, state.bonus],
    shallow
  );

  let value;
  if (bonusInputValue) {
    value =
      typeof bonus.answer === 'object' ? bonus.answer.number : bonus.answer;
  } else {
    value =
      typeof questions[order - 1].answer === 'object'
        ? questions[order - 1].answer.number
        : questions[order - 1].answer;
  }

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
        value={value}
      />
    </Box>
  );
};

FormNumber.propTypes = {
  label: PropTypes.string.isRequired,
  order: PropTypes.number,
  overrideDefault: PropTypes.func,
  bonusInputValue: PropTypes.bool,
};

FormNumber.defaultProps = {
  bonusInputValue: false,
};

export default FormNumber;
