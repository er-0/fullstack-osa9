import { Entry, Diagnosis } from "../../types";
import Favorite from '@mui/icons-material/Favorite';
import { green, yellow, orange, red } from '@mui/material/colors';
import { LocalHospital, Work, MedicalServices } from "@mui/icons-material/";

interface Props {
  entry: Entry
  diagnoses: Diagnosis[]
}

const healthColor = (rating : number) => {
  if (rating === 0) {
    return <Favorite sx={{ color: green[500] }}/>;
  }
  if (rating === 1) {
    return <Favorite sx={{ color: yellow[500] }}/>;
  }
  if (rating === 2) {
    return <Favorite sx={{ color: orange[500] }}/>;
  }
  if (rating === 3) {
    return <Favorite sx={{ color: red[500] }}/>;
  }

};

export const HospitalEntry = ({ entry, diagnoses } : Props) => {
  // Different types of entry could be assigned as props 
  // even though in this app the function is only called within switch case
  if (entry.type === "Hospital") { 
    return (
      <div>
        <LocalHospital /> <br/>
        <b>{entry.date}</b> <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code) =>
              <li key={code}>
                {code} {diagnoses.find(n => n.code === code)?.name}
              </li>
            )}   
          </ul>
        <p>Discharge: <br/>
        {entry.discharge.date}: {entry.discharge.criteria}</p>
        Diagnosed by {entry.specialist}
      </div>
    );
  }
};

export const OccupationalHealthcareEntry = ({ entry, diagnoses } : Props) => {
  if (entry.type === "OccupationalHealthcare") {
    return (
      <div>
        <Work /> <br/>
        <b>{entry.date}</b> <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code) =>
              <li key={code}>
                {code} {diagnoses.find(n => n.code === code)?.name}
              </li>
            )}
          </ul>
        <p>
        {entry.sickLeave && <><b>Sick leave:</b><br /></>}
        {entry.sickLeave && <>Start date: {entry.sickLeave.startDate}<br /></>}
        {entry.sickLeave?.endDate && "End date: " + entry.sickLeave.endDate}</p>
        <p>Employer: {entry.employerName}</p>
        Diagnosed by {entry.specialist}
      </div>
    );
  }
};

export const HealthCheckEntry = ({ entry, diagnoses } : Props) => {
  if (entry.type === "HealthCheck") {
    return (
      <div>
        <MedicalServices /> <br/>
        <b>{entry.date}</b> <i>{entry.description}</i><br/>
        {healthColor(entry.healthCheckRating)}
          <ul>
            {entry.diagnosisCodes?.map((code) =>
              <li key={code}>
                {code} {diagnoses.find(n => n.code === code)?.name}
              </li>
            )}
          </ul>
          Diagnosed by {entry.specialist}
      </div>
    );
  }
};