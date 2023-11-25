import { Gender, Patient, Diagnosis } from "../../types";
import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

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
          <div key={entry.id}>
            {entry.date} <i>{entry.description}</i>
            <ul>
              {entry.diagnosisCodes?.map((code) =>
                <li>
                  {code} {diagnoses.find(n => n.code === code)?.name}
                </li>
              )}
            </ul>
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