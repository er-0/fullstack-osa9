import { NewEntry, Diagnosis, HealthCheckRating } from './types';


//General use
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};


//BaseEntry
const parseType = (type: unknown): "Hospital" | "OccupationalHealthcare" | "HealthCheck" => {
  if ((type !== "Hospital") && (type !== "OccupationalHealthcare") && (type !== "HealthCheck")) {
    throw new Error('Incorrect or missing type: ' + type); 
  }
  return type;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};


//HospitalEntry
const parseDischarge = (discharge: unknown): {date: string, criteria: string} => {
  if (!discharge || typeof discharge !== 'object' || !('date' in discharge) || !('criteria' in discharge)) {
    throw new Error('Incorrect or missing discharge information');
  }
  const parsedDischarge: {date: string, criteria: string} = {
    date: parseDate(discharge.date),
    criteria: parseDescription(discharge.criteria),
  };

  return parsedDischarge;
};


//OccupationalHealthcare
const parseEmployer = (employer: unknown): string => {
  if (!isString(employer)) {
    throw new Error('Incorrect or missing employer: ' + employer);
  }
  return employer;
};

const parseSickLeave = (sickLeave: unknown): {startDate: string, endDate: string} => {
  if (!sickLeave || typeof sickLeave !== 'object' || !('startDate' in sickLeave) || !('endDate' in sickLeave)) {
    throw new Error('Incorrect or missing discharge information');
  }
  const parsedSickLeave: {startDate: string, endDate: string} = {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };

  return parsedSickLeave;
};


//HealthCheck
const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheck = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
      throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};


//NewEntry
const toNewEntry = (object: unknown): NewEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object && 'diagnosisCodes' in object) {
    const commonFields = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      type: parseType(object.type),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    };

    switch (commonFields.type) {
      case 'Hospital':
        if ('discharge' in object) {
          return { ...commonFields, discharge: parseDischarge(object.discharge) } as NewEntry;
          }
        break;
      case 'OccupationalHealthcare':
        if ('employerName' in object && 'sickLeave' in object) {
          return { 
            ...commonFields, 
            employerName: parseEmployer(object.employerName), 
            sickLeave: parseSickLeave(object.sickLeave) } as NewEntry;
          } 
        break;
      case 'HealthCheck':
        if ('healthCheckRating' in object) {
          return { ...commonFields, healthCheckRating: parseHealthCheck(object.healthCheckRating) } as NewEntry;
          }
        break;
      default:
        throw new Error('Invalid entry type');
    }
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewEntry;



/*const parseHealthCheck = (healthCheckRating: unknown): "Healthy" | "LowRisk" | "HighRisk" | "CriticalRisk" => {
  if ((healthCheckRating !== "Healthy") && 
    (healthCheckRating !== "LowRisk") && 
    (healthCheckRating !== "HighRisk") &&
    (healthCheckRating !== "CriticalRisk")) {
    throw new Error('Incorrect or missing type: ' + healthCheckRating); 
  }
  return healthCheckRating;
};*/