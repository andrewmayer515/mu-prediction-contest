import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import FormPlayer from '../form-player';
import FormNumber from '../form-number';

//---------------------------------------------------------------------

const FormPlayerNumber = ({ primaryLabel, secondaryLabel, order }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <FormPlayer label={primaryLabel} order={`${order}.player`} />
      <FormNumber label={secondaryLabel} order={`${order}.number`} />
    </Box>
  );
};

FormPlayerNumber.propTypes = {
  primaryLabel: PropTypes.string.isRequired,
  secondaryLabel: PropTypes.string.isRequired,
  order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default FormPlayerNumber;
