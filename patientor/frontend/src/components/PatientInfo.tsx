// import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { useEffect, useState } from "react";
import { Container, Typography, Icon } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';

interface Props {
  getPatient: (id: string) => Promise<Patient>;
}

const PatientInfo = ({ getPatient }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    void getPatient(id).then(setPatient);
  }, [id, getPatient]);

  if (!patient) return <div>loading…</div>;
  console.log('patient', patient);
  return (
    <div className="Patient">
      <Container>
        <Typography variant="h4" sx={{ marginBottom: "0.5em" }}>
          {patient.name} <MaleIcon></MaleIcon>
        </Typography>
        
        <Typography sx={{ fontSize: "1.5rem" }}>ssn: {patient.ssn}</Typography>
        <Typography sx={{ fontSize: "1.5rem" }}>occupation: {patient.occupation}</Typography>
        <Typography sx={{ fontSize: "1.5rem" }}>date of birth: {patient.dateOfBirth}</Typography>
      </Container>
    </div>
  );
};

export default PatientInfo;
