import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class HtmlSanitizerService {
  constructor(private sanitizer: DomSanitizer) { }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.sanitize(1, url) || '';
  }

  sanitizeResourceUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  isSecureUrl(url: string): boolean {
    const secureProtocols = ['https:', 'data:', 'blob:'];
    try {
      const urlObj = new URL(url);
      return secureProtocols.includes(urlObj.protocol);
    } catch (error) {
      return false;
    }
  }
}
