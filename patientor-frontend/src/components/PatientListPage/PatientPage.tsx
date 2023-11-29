import { Gender, Patient, Diagnosis, Entry } from "../../types";
import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "./entryTypes";

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
  const id = useParams().id;
  const patient = patients.find(n => n.id === id);
  if (patient) {
    return (
      <div className="Patient">
        <h2>{patient.name} {genderMarker(patient.gender)}</h2> 
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>entries</h3>
        {patient.entries.map((entry) => 
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