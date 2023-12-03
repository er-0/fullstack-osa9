import { Gender, Patient, Diagnosis, Entry, NewEntry } from "../../types";
import { useParams } from "react-router-dom";
import { Button } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "./entryTypes";
import HealthCheckEntryForm from "../EntryForms/HealthCheckEntryForm";
import HospitalEntryForm from "../EntryForms/HospitalEntryForm";
import OccupationalEntryForm from "../EntryForms/OccupationalEntryForm";
import patientService from "../../services/patients";
import axios from "axios";

import { useState, useEffect } from "react";
import { Alert } from '@mui/material';

interface Props {
  patients : Patient[]
  diagnoses : Diagnosis[]
}

const genderMarker = ( gender : Gender ) => {
  if (gender === 'female') {
    return <FemaleIcon></FemaleIcon>;
  } else if (gender === 'male') {
    return <MaleIcon></MaleIcon>;
  } else {
    return <TransgenderIcon></TransgenderIcon>;
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry, diagnoses : Diagnosis[] }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses}/>;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses}/>;
    default:
      return assertNever(entry);
  }
};

export const PatientPage = ({ patients, diagnoses } : Props) => {
  const [selectedForm, setSelectedForm] = useState<string>('');
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [error, setError] = useState<string>();
  const id = useParams().id;
  const patient = patients.find(n => n.id === id);

  useEffect(() => {
    if (patient) {
      setEntries(patient.entries);
    }
  }, [patient]);

  const submitNewEntry = async (values: NewEntry, patientId: string) => {
  try {
    const entry = await patientService.addEntry(values, patientId);
    setEntries((prevEntries) => (prevEntries ? [...prevEntries, entry] : [entry]));
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      if (e?.response?.data && typeof e?.response?.data === "string") {
        const message = e.response.data.replace('Something went wrong. Error: ', '');
        console.error(message);
        setError(message);
        setTimeout(() => {
          setError('');
        }, 5000);
      } else {
        setError("Unrecognized axios error");
      }
    } else {
      console.error("Unknown error", e);
      setError("Unknown error");
    }
  }
  };

  if (patient) {
    return (
      <div className="Patient">
        <h2>{patient.name} {genderMarker(patient.gender)}</h2> 
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>

        {error && <Alert severity="error">{error}</Alert>}<br/>

        <Button variant="contained" color="primary" onClick={() => setSelectedForm('healthCheck')}>
          Health Check Entry </Button>
        <Button variant="contained" color="primary" onClick={() => setSelectedForm('hospital')}>
          Hospital Entry </Button>
        <Button variant="contained" color="primary" onClick={() => setSelectedForm('occupational')}>
          Occupational Entry </Button>

        {selectedForm &&
          <Button variant="contained" color="secondary" onClick={() => setSelectedForm('')}>
            Close form </Button>}

        {selectedForm === 'healthCheck' && (
          <HealthCheckEntryForm onSubmit={submitNewEntry} patientId={patient.id} diagnoses={diagnoses}/>)}
        {selectedForm === 'occupational' && (
          <OccupationalEntryForm onSubmit={submitNewEntry} patientId={patient.id} diagnoses={diagnoses}/>)}
        {selectedForm === 'hospital' && (
          <HospitalEntryForm onSubmit={submitNewEntry} patientId={patient.id} diagnoses={diagnoses}/>)}

        <h3>entries</h3>
        {entries?.map((entry) => 
          <div key={entry.id} style={{ border: '1px solid #ccc', borderRadius: '8px', margin: '10px', padding: '8px' }}>
            <EntryDetails entry={entry} diagnoses={diagnoses} />
          </div>
        )}
      </div>
    );

  } else {
    return (
      <div>
      No patient found.
      </div>
    );
  }
};