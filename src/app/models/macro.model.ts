import { DiagnosticoModel} from "./diagnostico.model";

export interface MacroModel {
  id:number;
  x1:number;
  x2:number;
  y1:number;
  y2:number;
  image:DiagnosticoModel
  microCount:number;
}
