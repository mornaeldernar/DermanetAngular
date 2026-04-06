import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) {
      return 'Sin teléfono';
    }

    // Limpiar el teléfono: quitar espacios, guiones, paréntesis, etc.
    const cleaned = value.toString().replace(/\D/g, '');


    // Validar que tenga dígitos
    if (cleaned.length === 0) {
      return 'Sin teléfono';
    }

    // Formato para 10 dígitos (México): (999) 999-9999
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }

    // Formato para 11 dígitos (con código de país 1): +1 (999) 999-9999
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }

    // Formato para 12 dígitos (con código de país 52 - México): +52 999 999 9999
    if (cleaned.length === 12 && cleaned.startsWith('52')) {
      return `+52 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
    }

    // Formato para 8 dígitos (teléfono fijo sin lada): 9999-9999
    if (cleaned.length === 8) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    }

    // Formato para 7 dígitos o menos: XXX-XXXX
    if (cleaned.length === 7) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    }

    // Si no coincide con ningún formato conocido, retornar con guiones cada 3 dígitos
    return cleaned.replace(/(\d{3})(?=\d)/g, '$1-');
  }
}