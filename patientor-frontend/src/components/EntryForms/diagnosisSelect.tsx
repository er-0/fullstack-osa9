import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


import { Diagnosis } from "../../types";
interface Props {
  diagnoses: Diagnosis[]
  onChange: (diagnosisCodes: string[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect({ diagnoses, onChange }: Props) {
  //const theme = useTheme();
  const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    // diagnostic codes back to the parent component
    onChange(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div>
      <FormControl sx={{ width: 800 }}>
        <InputLabel id="diagnosiscodes">Codes</InputLabel>
        <Select
          labelId="diagnosiscodes"
          id="diagnosiscodes"
          multiple
          value={diagnosisCodes}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          renderValue={(selected) => selected.join(', ')}
        >
        {diagnoses.map((diagnosis) => (
          <MenuItem
            key={diagnosis.code}
            value={diagnosis.code}
          >
            {diagnosis.code}: {diagnosis.name}
          </MenuItem>
        ))}
        </Select>
      </FormControl>
    </div>
  );
}