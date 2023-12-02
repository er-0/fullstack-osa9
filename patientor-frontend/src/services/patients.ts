import axios from "axios";
import { Patient, PatientFormValues, NewEntry, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (object: NewEntry, patientId: string) => {
  const { data } = await axios.post<NewEntry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object
  );
  console.log(data);
  return data as Entry;
};

export default {
  getAll, create, addEntry
};

