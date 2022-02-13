import React from 'react';
import PropTypes from 'prop-types';
import shallow from 'zustand/shallow';
import Box from '@mui/material/Box';

import FormPlayer from '../form-player';
import FormNumber from '../form-number';
import useStore from '../../store';

//---------------------------------------------------------------------

const FormPlayerNumber = ({
  primaryLabel,
  secondaryLabel,
  order,
  // overrideDefault,
}) => {
  const [updateQuestion, questions] = useStore(
    state => [state.updateQuestion, state.questions],
    shallow
  );

  const { player, number } = questions[order - 1].answer;

  // useEffect(() => {
  //   // Don't fire on initial render
  //   if (player !== undefined || number !== undefined) {
  //     if (overrideDefault) {
  //       overrideDefault({
  //         player,
  //         number,
  //       });
  //     } else {
  //       updateQuestion({ order, answer: { player, number } });
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [player, number]);

  const handlePlayerChange = updated => {
    updateQuestion({ order, answer: { player: updated, number } });
  };

  const handleNumberChange = updated => {
    updateQuestion({ order, answer: { player, number: updated } });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <FormPlayer
        label={primaryLabel}
        order={order}
        overrideDefault={handlePlayerChange}
      />
      <FormNumber
        label={secondaryLabel}
        order={order}
        overrideDefault={handleNumberChange}
      />
    </Box>
  );
};

FormPlayerNumber.propTypes = {
  primaryLabel: PropTypes.string.isRequired,
  secondaryLabel: PropTypes.string.isRequired,
  order: PropTypes.number,
  overrideDefault: PropTypes.func,
};

export default FormPlayerNumber;
