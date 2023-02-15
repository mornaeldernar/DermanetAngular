import { PacienteModel } from "../paciente.model";
import { PageModel } from "./page.model";

export interface PatientsResponseModel {

  _embedded : Paciente;
  page: PageModel;
}
export interface Paciente {
  patients:PacienteModel[];
}
