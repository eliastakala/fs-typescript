// import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../types";
import { useEffect, useState, useMemo } from "react";
import { Container, Typography, List, ListItem } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import diagnosisService from "../services/diagnoses";
import Paper from "@mui/material/Paper";

interface Props {
  getPatient: (id: string) => Promise<Patient>;
}

const PatientInfo = ({ getPatient }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    void diagnosisService.getAll().then(setDiagnoses);
  }, []);

  useEffect(() => {
    if (!id) return;
    void getPatient(id).then(setPatient);
  }, [id, getPatient]);

  const byCode = useMemo(
    () => new Map(diagnoses.map((d) => [d.code.toUpperCase(), d])),
    [diagnoses],
  );

  if (!patient) return <div>loading…</div>;

  console.log("diagnoses", diagnoses);

  const genderIcons = {
    male: <MaleIcon />,
    female: <FemaleIcon />,
    other: <TransgenderIcon />,
  };

  console.log("patient", patient.entries);

  return (
    <div className="Patient">
      <Container>
        <Typography variant="h4" sx={{ marginBottom: "0.5em" }}>
          {patient.name} {genderIcons[patient.gender] ?? <TransgenderIcon />}
        </Typography>

        <Typography sx={{ fontSize: "1.5rem" }}>ssn: {patient.ssn}</Typography>
        <Typography sx={{ fontSize: "1.5rem" }}>
          occupation: {patient.occupation}
        </Typography>
        <Typography sx={{ fontSize: "1.5rem" }}>
          date of birth: {patient.dateOfBirth}
        </Typography>
        <Typography variant="h4" sx={{ marginBottom: "0.5em" }}>
          entries
        </Typography>
        {patient.entries.map((entry) => (
          <div key={entry.id}>
            <Paper variant="outlined" sx={{ p: 2, mb: 1 }}>
              <Typography sx={{ fontSize: "1.5rem" }}>
                {entry.date} {entry.description}
              </Typography>
              <List sx={{ listStyleType: "disc", pl: 4 }}>
                {entry.diagnosisCodes?.map((code) => (
                  <ListItem
                    key={code}
                    sx={{ display: "list-item", fontSize: "1.5rem" }}
                  >
                    <Typography sx={{ fontSize: "1.5rem" }}>
                      {code} {byCode.get(code)?.name}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <Typography sx={{ fontSize: "1.5rem" }}>
                diagnose by: {entry.specialist}
              </Typography>
            </Paper>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default PatientInfo;
