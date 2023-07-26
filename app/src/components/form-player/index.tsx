import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import ky from 'ky';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { getPlayerOptions } from './helpers';
import { RosterContextInterface } from './types';

//---------------------------------------------------------------------

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type Props = {
  label: string;
  order: string | number;
};

function FormPlayer({ label, order }: Props) {
  const { control, setValue } = useFormContext();
  const { data } = useQuery(
    'roster',
    (): Promise<RosterContextInterface> => ky.get('/api/roster').json()
  );
  const roster = data ?? {};

  useEffect(() => {
    setValue(`${order}.playerText`, label);
  }, [label, order, setValue]);

  return (
    <>
      <FormControl sx={{ my: 1, mr: 1, width: 250 }}>
        <Controller
          name={`${order}.player`}
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              autoHighlight
              autoSelect
              multiple
              getOptionLabel={option => option.value}
              isOptionEqualToValue={(option, _value) =>
                option.value === _value.value
              }
              value={value}
              onChange={(_, input) => onChange(input)}
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
          )}
        />
      </FormControl>
    </>
  );
}

export default FormPlayer;
