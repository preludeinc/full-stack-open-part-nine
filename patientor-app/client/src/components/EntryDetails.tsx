import { PartProps } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member:
    ${JSON.stringify(value)}`
  );
};

// TODO: Clean up formatting
const EntryDetails: React.FC<PartProps> = ({ entry }) => {
  if ("type" in entry) {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <>
            <p>{entry.healthCheckRating}</p>
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <p>employer name: {entry.employerName}</p>
            {entry.sickLeave ? (
              <>
                <p>sick leave start date: {entry.sickLeave.startDate}</p>
                <p>sick leave end date: {entry.sickLeave.endDate}</p>
              </>
            ) : null}
          </>
        );
      case "Hospital":
        return (
          <>
            <p>discharge: {entry.discharge.date}</p>
            <p>criteria: {entry.discharge.criteria}</p>
          </>
        );
      default:
        return assertNever(entry);
    }
  }
};

export default EntryDetails;