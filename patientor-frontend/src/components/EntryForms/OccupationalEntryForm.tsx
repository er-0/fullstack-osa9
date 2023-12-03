import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button, Input /*InputLabel, MenuItem, Select,  SelectChangeEvent*/ } from '@mui/material';

import { NewEntry } from "../../types";

interface Props {
  onSubmit: (values: NewEntry, patientId: string) => void;
  patientId: string
}

const OccupationalEntryForm = ({ onSubmit, patientId }: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [employerName, setEmployer] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [sickLeave, setSickLeave] = useState<{ startDate: string; endDate?: string } | undefined>(undefined);
  const type = "OccupationalHealthcare";

  const addEvent = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type,
      description,
      specialist,
      date,
      diagnosisCodes,
      employerName,
      sickLeave,
    }, patientId);
  };

  return (
    <div>
      <h3>New OccupationalHealthcareEntry</h3>
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
          label="Employer"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployer(target.value)}
        />
        <TextField
          label="Diagnostic codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(','))}
        /> 
        Sick leave start date: <Input
          style={{
            paddingTop: "8px",
            paddingBottom: "8px"
          }}
          type="Date"
          value={sickLeave?.startDate}
          onChange={({ target }) => setSickLeave((sickLeave) => ({...sickLeave, startDate: target.value}))}
        /><br/>
        Sick leave end date: <Input
          style={{
            paddingTop: "8px",
            paddingBottom: "8px"
          }}
          type="Date"
          value={sickLeave?.endDate}
          onChange={({ target }) => setSickLeave((sickLeave) => ({ ...sickLeave || {startDate: ''}, endDate: target.value}))}
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

export default OccupationalEntryForm;