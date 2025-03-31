import { useEffect, useState } from "react";
import { Patient, Entry } from "../../types";
import EntryDetails from "../EntryDetails";
import patientService from '../../services/patients';

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
        return (
          <>
           <h2><b>{patient.name}{" "}{icon}</b></h2>
           <p>ssn: {patient.ssn}</p>
           <p>occupation: {patient.occupation}</p>
      
           <div>
            <h3><b>entries</b></h3>
            {entries && entries.length > 0 ? (
                entries.map((e) => (
                  <div key={e.id}>
                    <p>{<p>{e.date} <i>{e.description}</i></p>}</p>
                    {e.diagnosisCodes?.map((d) => (
                      <p>{d}</p>
                    ))}
                    <EntryDetails entry={e} />
                    <p>diagnosed by: {e.specialist}</p>
                  </div>
                ))): null}
           </div>
          </>
        )
      }
    }
  }
}

export default PatientPage;