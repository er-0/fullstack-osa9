import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../patientutils';
import { NewEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  res.send(patientService.patientById(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  console.log(req.body, 'reqbody');
  console.log(res, 'res');
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry : NewEntry = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const addedEntry = patientService.addEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;