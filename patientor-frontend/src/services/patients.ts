import axios from "axios";
import { Patient, PatientFormValues, NewEntryForm, NewEntry } from "../types";

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

const addEntry = async (object: NewEntryForm) => {
  const { data } = await axios.post<NewEntry>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export default {
  getAll, create, addEntry
};

