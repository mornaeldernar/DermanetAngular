import { LinksModel } from "./dto/links.model";

export interface PacienteModel {
  id:number;
  name:string;
  lastName:string;
  birthdate:Date;
  sex:string;
  phone:string;
  profesion:string;
  email?:string;
}
