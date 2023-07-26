import React from 'react';
import Box from '@mui/material/Box';

import FormPlayer from '../form-player';
import FormNumber from '../form-number';

//---------------------------------------------------------------------

type Props = {
  primaryLabel: string;
  secondaryLabel: string;
  order: string | number;
};

function FormPlayerNumber({ primaryLabel, secondaryLabel, order }: Props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <FormPlayer label={primaryLabel} order={`${order}`} />
      <FormNumber label={secondaryLabel} order={`${order}`} />
    </Box>
  );
}

export default FormPlayerNumber;
