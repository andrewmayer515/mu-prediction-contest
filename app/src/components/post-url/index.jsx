import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

//---------------------------------------------------------------------

const PostURL = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const hasError = errors.url && errors.url.type === 'required';

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, mt: 3, minWidth: 500 },
      }}
      noValidate
      autoComplete="off"
    >
      <Controller
        name="url"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextField
            id="outlined-basic"
            label="MU Scoop Post URL"
            variant="outlined"
            onChange={onChange}
            value={value}
            error={hasError}
            helperText={hasError ? 'Required' : ''}
          />
        )}
      />
    </Box>
  );
};

export default PostURL;
