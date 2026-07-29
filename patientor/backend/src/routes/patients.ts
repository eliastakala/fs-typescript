import express from "express";
import patientService from "../services/patientService.ts";
import parseNewPatient from "../../utils.ts";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = patientService.getPatients();
  res.send(data);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const data = patientService.getPatientById(id);
  res.send(data);
});

router.post("/:id/entries", (req, res) => {
  const { id } = req.params;
  const modifiedPatient = patientService.addEntry(id, req.body)
  res.json(modifiedPatient);
});

router.post("/", (req, res) => {
  try {
    const newPatient = parseNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

export default router;
