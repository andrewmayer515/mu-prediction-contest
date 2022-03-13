import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';

import FormPlayer from '../form-player';
import FormNumber from '../form-number';
import FormPlayerNumber from '../form-player-number';

//---------------------------------------------------------------------

const Bonus = () => {
  const { control, watch } = useFormContext();
  const [checked, setChecked] = useState(false);
  const watchType = watch('bonus.type');

  const handleSwitchChange = () => {
    setChecked(!checked);
  };

  const renderQuestionType = () => {
    switch (watchType) {
      case 'player':
        return <FormPlayer label="Enter Player" order="bonus" />;
      case 'number':
        return <FormNumber label="Enter Number" order="bonus" />;
      case 'playerNumber':
        return (
          <FormPlayerNumber
            primaryLabel="Enter Player"
            secondaryLabel="Enter Number"
            order="bonus"
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormGroup>
      <FormControlLabel
        sx={{ maxWidth: 200, mb: 1 }}
        control={<Switch checked={checked} onChange={handleSwitchChange} />}
        label="Bonus Question"
      />
      {checked && (
        <>
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Controller
              name="bonus.text"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  autoComplete="off"
                  sx={{ minWidth: 100 }}
                  id="outlined-basic"
                  label="Bonus Question"
                  variant="outlined"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              name="bonus.points"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  autoComplete="off"
                  sx={{ mx: 1, minWidth: 50, maxWidth: 100 }}
                  id="outlined-basic"
                  label="Points"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="bonus.type"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <FormControl sx={{ minWidth: 175, maxWidth: 200 }}>
                  <InputLabel>Question type</InputLabel>
                  <Select
                    value={value}
                    label="Question type"
                    onChange={onChange}
                  >
                    <MenuItem value="player">Player</MenuItem>
                    <MenuItem value="number">Number</MenuItem>
                    <MenuItem value="playerNumber">Player/Number</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Box>
          {renderQuestionType()}
        </>
      )}
    </FormGroup>
  );
};

export default Bonus;
