import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button, Input, InputLabel, MenuItem, Select } from '@mui/material';

import { HealthCheckRating, NewEntry, Diagnosis } from "../../types";
import MultipleSelect from "./diagnosisSelect";

interface Props {
  onSubmit: (values: NewEntry, patientId: string) => void;
  patientId: string,
  diagnoses: Diagnosis[]
}

const HealthCheckEntryForm = ({ onSubmit, patientId, diagnoses }: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);

  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]); 
  //from MultipleSelect
  const handleDiagnosisCodesChange = (newDiagnosisCodes: string[]) => {
    setDiagnosisCodes(newDiagnosisCodes);
  };

  const addEvent = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      specialist,
      healthCheckRating,
      date,
      diagnosisCodes,
      type: "HealthCheck"
    }, patientId);
  };

  return (
    <div>
      <h3>New HealthCheckEntry</h3>
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
        <InputLabel id="healthcheckrating">Health Check Rating</InputLabel>
          <Select
            labelId="healthcheckrating"
            id="healthcheckrating"
            value={healthCheckRating}
            label="Health Check"
            onChange={(event) => setHealthCheckRating(event.target.value as HealthCheckRating)}
          >
          <MenuItem value={0}>Healthy</MenuItem>
          <MenuItem value={1}>Low risk</MenuItem>
          <MenuItem value={2}>High risk</MenuItem>
          <MenuItem value={3}>Critical risk</MenuItem>
          </Select>
        <MultipleSelect diagnoses={diagnoses} onChange={handleDiagnosisCodesChange}/>
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

export default HealthCheckEntryForm;