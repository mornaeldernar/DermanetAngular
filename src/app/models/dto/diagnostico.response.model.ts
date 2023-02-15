import { DiagnosticoModel } from "../diagnostico.model";

export interface DiagnosticoResponseModel {
  _embedded : Diagnostico;
}
export interface Diagnostico {
  diagnostics:DiagnosticoModel[];
}

