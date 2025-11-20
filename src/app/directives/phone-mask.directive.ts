import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Solo números

    // Limitar a 10 dígitos
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    // Formatear mientras escribe
    let formatted = '';
    if (value.length > 0) {
      formatted = '(' + value.slice(0, 3);
    }
    if (value.length >= 4) {
      formatted += ') ' + value.slice(3, 6);
    }
    if (value.length >= 7) {
      formatted += '-' + value.slice(6, 10);
    }

    input.value = formatted;
  }

  @HostListener('blur', ['$event'])
  onBlur(event: any): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    
    // Validar que tenga 10 dígitos al salir del campo
    if (value.length > 0 && value.length < 10) {
      console.warn('⚠️ Teléfono incompleto:', value);
    }
  }
}