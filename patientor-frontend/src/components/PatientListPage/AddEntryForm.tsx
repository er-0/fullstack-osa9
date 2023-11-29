import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button, /*InputLabel, MenuItem, Select,  SelectChangeEvent*/ } from '@mui/material';

import { HealthCheckRating, NewEntryForm } from "../../types";

interface Props {
  onSubmit: (values: NewEntryForm) => void; ///TESTING
}

type EntryType = "HealthCheck"; //| "OccupationalHealthcare" | "Hospital";

const AddEntryForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [type, setType] = useState<EntryType>("HealthCheck");

  const addEvent = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      specialist,
      healthCheckRating,
      date,
      diagnosisCodes,
      type
    });
  };

  return (
    <div>
      <form onSubmit={addEvent}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        /> 
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
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
          label="Health check rating"
          fullWidth
          value={healthCheckRating}
          onChange={() => setHealthCheckRating(HealthCheckRating.Healthy)}
        />
        <TextField
          label="Diagnostic codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(', '))}
        />
        <TextField
          label="Type"
          fullWidth
          value={type}
          onChange={() => setType('HealthCheck')}
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
      </form>
    </div>
  );
};

export default AddEntryForm;