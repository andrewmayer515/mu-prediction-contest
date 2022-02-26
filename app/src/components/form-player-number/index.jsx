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
  overrideDefault,
  bonusInputValue,
}) => {
  const [updateQuestion, questions, bonus] = useStore(
    state => [state.updateQuestion, state.questions, state.bonus],
    shallow
  );

  const { player, number } = bonusInputValue
    ? bonus.answer
    : questions[order - 1].answer;

  const handlePlayerChange = updated => {
    if (bonusInputValue) {
      overrideDefault({ player: updated, number });
    } else {
      updateQuestion({ order, answer: { player: updated, number } });
    }
  };

  const handleNumberChange = updated => {
    if (bonusInputValue) {
      overrideDefault({ player, number: updated });
    } else {
      updateQuestion({ order, answer: { player, number: updated } });
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <FormPlayer
        label={primaryLabel}
        order={order}
        overrideDefault={handlePlayerChange}
        bonusInputValue={bonusInputValue}
      />
      <FormNumber
        label={secondaryLabel}
        order={order}
        overrideDefault={handleNumberChange}
        bonusInputValue={bonusInputValue}
      />
    </Box>
  );
};

FormPlayerNumber.propTypes = {
  primaryLabel: PropTypes.string.isRequired,
  secondaryLabel: PropTypes.string.isRequired,
  order: PropTypes.number,
  overrideDefault: PropTypes.func,
  bonusInputValue: PropTypes.bool,
};

FormPlayerNumber.defaultProps = {
  bonusInputValue: false,
};

export default FormPlayerNumber;
