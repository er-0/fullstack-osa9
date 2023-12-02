import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button, Input /*InputLabel, MenuItem, Select,  SelectChangeEvent*/ } from '@mui/material';

import { NewEntry } from "../../types";

interface Props {
  onSubmit: (values: NewEntry, patientId: string) => void;
  patientId: string
}

const HospitalEntryForm = ({ onSubmit, patientId }: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [discharge, setDischarge] = useState<{ date: string; criteria: string }>({
    date: '',
    criteria: '',
  });
  const type = "Hospital";

  const addEvent = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type,
      description,
      specialist,
      date,
      diagnosisCodes,
      discharge
    }, patientId);
  };

  return (
    <div>
      <h3>New HospitalEntry</h3>
      <form onSubmit={addEvent}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        /> 
        Entry date: <Input
          style={{
            paddingTop: "8px",
            paddingBottom: "8px"
          }}
          type="Date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnostic codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(','))}
        />
        Discharge date: <Input
          style={{
            paddingTop: "8px",
            paddingBottom: "8px"
          }}
          type="Date"
          value={discharge.date}
          onChange={({ target }) => setDischarge((discharge) => ({...discharge, date: target.value}))}
        />
        <TextField
          label="Discharge criteria"
          fullWidth
          value={discharge.criteria}
          onChange={({ target }) => setDischarge((discharge) => ({...discharge, criteria: target.value}))}
        />
        <Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
        <br/>
      </form>
    </div>
  );
};

export default HospitalEntryForm;