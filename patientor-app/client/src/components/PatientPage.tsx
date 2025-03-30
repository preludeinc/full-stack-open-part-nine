import { Patient } from "../types";

const PatientPage = ({ patient } : { patient: Patient }) => {
  let icon = '';

  switch (patient.gender) {
    case 'female': icon = '\u2640'; break;
    case 'male': icon = '\u2642'; break;
    case 'other': icon = '\u26a7'; break;
  }

  let entries = patient.entries;

  return (
    <>
     <h2><b>{patient.name}{" "}{icon}</b></h2>
     <p>occupation: {patient.occupation}</p>

     <div>
      <h3><b>entries</b></h3>
      {entries.map((e) => (
        <div key={e.id}>
          <p>{e.date} <i>{e.description}</i></p>
          <p>{e.diagnosisCodes}</p>
        </div>
      ))}
     </div>
    </>
  )
}

export default PatientPage;