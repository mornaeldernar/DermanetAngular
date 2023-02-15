import { SpecialityModel } from "./speciality.model";

export interface DoctorModel {
  id?: number;
  name: string;
  lastName: string;
  speciality: SpecialityModel;
}

