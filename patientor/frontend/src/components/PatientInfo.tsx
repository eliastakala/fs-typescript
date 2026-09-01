// import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import { useParams } from "react-router-dom";
import { Diagnosis, Patient, Entry } from "../types";
import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  Button,
  TextField,
  Box,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EmergencyIcon from "@mui/icons-material/Emergency";
import FavoriteIcon from "@mui/icons-material/Favorite";
import diagnosisService from "../services/diagnoses";
import Paper from "@mui/material/Paper";

interface Props {
  getPatient: (id: string) => Promise<Patient>;
}

interface CodeProps {
  codes?: Array<Diagnosis["code"]>;
  byCode: Map<string, Diagnosis>;
}

type RatingProps = {
  rating: number;
};

const HealthRating = ({ rating }: RatingProps) => {
  switch (rating) {
    case 0:
      return <FavoriteIcon style={{ color: "green" }} />;
    case 1:
      return <FavoriteIcon style={{ color: "yellow" }} />;
    default:
      return <FavoriteIcon />;
  }
};

const HealthCheck = ({ entry }: { entry: Entry }) => {
  if (entry.type !== "HealthCheck") return null;
  return (
    <div>
      <Typography sx={{ fontSize: "1.5rem" }}>
        {entry.date} <MonitorHeartIcon />
      </Typography>
      <Typography sx={{ fontSize: "1rem", fontStyle: "italic" }}>
        {entry.description}
      </Typography>
      <Typography sx={{ fontSize: "1rem", fontStyle: "italic" }}>
        <HealthRating rating={entry.healthCheckRating} />
      </Typography>
    </div>
  );
};

const OccupationalHealthcare = ({ entry }: { entry: Entry }) => {
  if (entry.type !== "OccupationalHealthcare") return null;
  return (
    <div>
      <Typography sx={{ fontSize: "1.5rem" }}>
        {entry.date} <MedicalServicesIcon /> {entry.employerName}
      </Typography>
      <Typography sx={{ fontSize: "1rem", fontStyle: "italic" }}>
        {entry.description}
      </Typography>
    </div>
  );
};

const Hospital = ({ entry }: { entry: Entry }) => {
  if (entry.type !== "Hospital") return null;
  return (
    <div>
      <Typography sx={{ fontSize: "1.5rem" }}>
        {entry.date} <EmergencyIcon />
      </Typography>
      <Typography sx={{ fontSize: "1rem", fontStyle: "italic" }}>
        {entry.description}
      </Typography>
    </div>
  );
};

const DiagnosisCodes = ({ codes, byCode }: CodeProps) => {
  if (!codes?.length || !byCode) return null;
  return (
    <div>
      <List sx={{ listStyleType: "disc", pl: 4 }}>
        {codes.map((code) => (
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
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled member of union ${JSON.stringify(value)}`);
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const genderIcons = {
  male: <MaleIcon />,
  female: <FemaleIcon />,
  other: <TransgenderIcon />,
};

const BasicInfo = ({ patient }: { patient: Patient }) => {
  return (
    <div>
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
    </div>
  );
};

const PatientInfo = ({ getPatient }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [entryVisibility, setEntryVisibility] = useState<boolean>(false);

  const [newDate, setNewDate] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newSpecialist, setNewSpecialist] = useState<string>("");
  const [newHealthCheckRating, setNewHealthCheckRating] = useState<string>("");
  const [newDiagnosisCodes, setNewDiagnosisCodes] = useState<string>("");

  const createEntry = (props: { date: string; description: string; specialist: string; healthCheckRating: string; diagnosisCodes: string; }) => {
    console.log('propsit', props);
  };

  const addEntry = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    createEntry({
      date: newDate,
      description: newSpecialist,
      specialist: newSpecialist,
      healthCheckRating: newHealthCheckRating,
      diagnosisCodes: newDiagnosisCodes,
    });
    
    setNewDate("");
    setNewDescription("");
    setNewSpecialist("");
    setNewHealthCheckRating("");
    setNewDiagnosisCodes("");
  };

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

  const handleClick = () => {
    setEntryVisibility(true);
  };

  return (
    <div className="Patient">
      <Container>
        <BasicInfo patient={patient} />
        <Typography variant="h4" sx={{ marginBottom: "0.5em" }}>
          entries
        </Typography>
        {patient.entries.map((entry) => (
          <div key={entry.id}>
            <Paper variant="outlined" sx={{ p: 2, mb: 1, border: "2px solid" }}>
              <EntryDetails entry={entry} />
              <DiagnosisCodes codes={entry.diagnosisCodes} byCode={byCode} />
              <Typography sx={{ fontSize: "1.5rem" }}>
                diagnose by {entry.specialist}
              </Typography>
            </Paper>
            <Button variant="contained" onClick={handleClick}>
              Add New Entry
            </Button>
            <Box
              component="form"
              onSubmit={addEntry}
              sx={{
                p: 2,
                border: "1px dashed grey",
                display: entryVisibility ? "flex" : "none",
                gap: 2,
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontSize: "1.5rem" }}>
                New Healthcheck Entry
              </Typography>
                <TextField
                  id="outlined-basic"
                  label="Date"
                  variant="outlined"
                  required
                  value={newDate}
                  onChange={(event) => {
                    setNewDate(event.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  required
                  value={newDescription}
                  onChange={(event) => {
                    setNewDescription(event.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Specialist"
                  variant="outlined"
                  required
                  value={newSpecialist}
                  onChange={(event) => {
                    setNewSpecialist(event.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Health Check Rating (0-3)"
                  variant="outlined"
                  required
                  value={newHealthCheckRating}
                  onChange={(event) => {
                    setNewHealthCheckRating(event.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Diagnosis Codes (comma-separated)"
                  variant="outlined"
                  required
                  value={newDiagnosisCodes}
                  onChange={(event) => {
                    setNewDiagnosisCodes(event.target.value);
                  }}
                />
              <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start" }}>Add</Button>
            </Box>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default PatientInfo;
