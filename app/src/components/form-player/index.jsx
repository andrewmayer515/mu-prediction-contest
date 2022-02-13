import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import shallow from 'zustand/shallow';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { RosterContext, InputContext } from '../../contexts';
import useStore from '../../store';
import { getPlayerOptions } from './helpers';

//---------------------------------------------------------------------

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FormPlayer = ({ label, order, overrideDefault }) => {
  const roster = useContext(RosterContext);
  const { input, setInput } = useContext(InputContext);

  const [questions] = useStore(state => [state.questions], shallow);
  const value = questions[order - 1].answer.player.map(item => ({
    value: item,
  }));

  const handleChange = (e, values) => {
    const player = values.map(_value => _value.value);
    if (overrideDefault) {
      overrideDefault(player);
    } else {
      setInput({
        ...input,
        [`question${order}`]: {
          text: `${label}:`,
          answer: player,
          type: 'player',
        },
      });
    }
  };

  return (
    <>
      <FormControl sx={{ my: 1, mr: 1, width: 250 }}>
        <Autocomplete
          autoHighlight
          autoSelect
          multiple
          getOptionLabel={option => option.value}
          isOptionEqualToValue={(option, _value) =>
            option.value === _value.value
          }
          value={value}
          onChange={handleChange}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.value}
            </li>
          )}
          options={getPlayerOptions(roster)}
          renderInput={params => <TextField {...params} label={label} />}
        />
      </FormControl>
    </>
  );
};

FormPlayer.propTypes = {
  label: PropTypes.string.isRequired,
  order: PropTypes.number,
  overrideDefault: PropTypes.func,
};

export default FormPlayer;
