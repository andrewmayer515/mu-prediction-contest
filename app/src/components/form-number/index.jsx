import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

//---------------------------------------------------------------------

const FormNumber = ({ label, order }) => {
  const { control } = useFormContext();

  return (
    <Box
      sx={{
        '& > :not(style)': { my: 1, minWidth: 250 },
      }}
      noValidate
      autoComplete="off"
    >
      <Controller
        name={`${order}`}
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextField
            id="outlined-basic"
            label={label}
            variant="outlined"
            onChange={onChange}
            value={value}
          />
        )}
      />
    </Box>
  );
};

FormNumber.propTypes = {
  label: PropTypes.string.isRequired,
  order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default FormNumber;
