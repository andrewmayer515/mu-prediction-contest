import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

//---------------------------------------------------------------------

type Props = {
  label: string;
  order: string | number;
};

const FormNumber = ({ label, order }: Props) => {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    setValue(`${order}.numberText`, label);
  }, [label, order, setValue]);

  return (
    <Box
      sx={{
        '& > :not(style)': { my: 1, minWidth: 250 },
      }}
    >
      <Controller
        name={`${order}.number`}
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextField
            id="outlined-basic"
            label={label}
            variant="outlined"
            onChange={onChange}
            value={value}
            type="number"
          />
        )}
      />
    </Box>
  );
};

export default FormNumber;
