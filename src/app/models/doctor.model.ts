import { SpecialityModel } from "./speciality.model";

export interface DoctorModel {
  id?: number;
  name: string;
  lastName: string;
  specialityId?: number;
  speciality: SpecialityModel;
  userId?: number;
  email?: string;
}

