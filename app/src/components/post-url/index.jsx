import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import useStore from '../../store';

//---------------------------------------------------------------------

const PostURL = () => {
  const [input, setInput] = useState();
  const updateURL = useStore(state => state.updateURL);

  const handleBlur = () => {
    updateURL(input);
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, mt: 3, minWidth: 500 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="MU Scoop Post URL"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </Box>
  );
};

export default PostURL;
