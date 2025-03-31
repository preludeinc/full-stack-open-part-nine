import { LocalHospitalOutlined, 
         MedicalInformationOutlined, 
         MedicalServicesOutlined } from "@mui/icons-material";
import { PartProps } from "../types";
import FavouriteIcon from '@mui/icons-material/Favorite';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member:
    ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<PartProps> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      let healthCheckHeart;
      
      switch (entry.healthCheckRating) {
        case 0:
          healthCheckHeart = <FavouriteIcon style={{ color: "black"}} />
          break;
        case 1:
          healthCheckHeart = <FavouriteIcon style={{ color: "gray" }} />
          break;
        case 2:
          healthCheckHeart = <FavouriteIcon style={{ color: "yellow" }} />
          break;
        case 3:
          healthCheckHeart = <FavouriteIcon style={{ color: "green" }} />
          break;
      }
      return (
        <>
          <p><MedicalServicesOutlined /> {healthCheckHeart}</p>
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <p>employer name: {entry.employerName}<MedicalInformationOutlined /></p>
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
          <LocalHospitalOutlined />
          <p>discharge: {entry.discharge.date}</p>
          <p>criteria: {entry.discharge.criteria}</p>
        </>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;