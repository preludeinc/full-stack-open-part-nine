/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express, { NextFunction, Request, Response } from 'express';
import patientService from '../services/patientService';
import { z } from 'zod';
import { newPatientSchema } from '../utils';
import { NewPatientEntry, Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
})

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  res.send(patient);
})

// middleware
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error)
  }
}

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, 
  res: Response<Patient>) => {
  const addEntry = patientService.addPatient(req.body)
  res.json(addEntry);
})

router.use(errorMiddleware);

export default router;