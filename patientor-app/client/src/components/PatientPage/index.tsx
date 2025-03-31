import { useEffect, useState } from "react";
import { Patient, Entry } from "../../types";
import EntryDetails from "../EntryDetails";
import patientService from '../../services/patients';
import { Box } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import ComputerIcon from '@mui/icons-material/Computer';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';

const PatientPage = ({ id }) => {
  const [patient, setPatient] = useState<Patient | undefined>();
  
  useEffect(() => {
    const fetchPatient = async () => {
      const p = await patientService.getPatient(id);
      setPatient(p);
    };
    void fetchPatient();
  }, []);

  let icon = '';

  if (patient) {
    switch (patient.gender) {
      case 'female': icon = '\u2640'; break;
      case 'male': icon = '\u2642'; break;
      case 'other': icon = '\u26a7'; break;
    }
  
    let entries: Entry[];
  
    if (patient.entries != undefined) {
      if (patient.entries.length > 0) {
        entries = patient.entries;

        let occupationIcon;

        switch (patient.occupation) {
          case 'New york city cop':
            occupationIcon = <LocalPoliceIcon />
            break;
          case 'Cop':
            occupationIcon = <LocalPoliceIcon />
            break;
          case 'Technician':
            occupationIcon = <HomeRepairServiceIcon />
            break;
          case 'Forensic Pathologist':
            occupationIcon = <WorkIcon />
            break;
          case 'Digital evangelist':
            occupationIcon = <ComputerIcon />
            break;
        }
        return (
          <Box>
            <h2><b>{patient.name}{" "}{icon}</b></h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation} {occupationIcon}</p>
      
            <div>
              <h3><b>entries</b></h3>
              {entries && entries.length > 0 ? (
                  entries.map((e) => (
                    <Box borderRadius={2} 
                      sx={{ border: '3px solid black', padding: 1.5, marginBottom: 2}}>
                      <div key={e.id}>
                        <p>{e.date}</p>
                        <p><i>{e.description}</i></p>
                        {e.diagnosisCodes?.map((d) => (
                          <p>{d}</p>
                        ))}
                        <EntryDetails entry={e} />
                        <p>diagnosed by: {e.specialist}</p>
                      </div>
                    </Box>
                  ))): null}
           </div>
          </Box>
        )
      }
    }
  }
}

export default PatientPage;