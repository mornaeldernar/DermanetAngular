import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'secure-image',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './secure-image.component.html',
  styleUrl: './secure-image.component.scss'
})
export class SecureImageComponent implements OnChanges  {
  // This code block just creates an rxjs stream from the src
  // this makes sure that we can handle source changes
  // or even when the component gets destroyed
  // So basically turn src into src$
  @Input() public src: string='';
  @Input() public alt: string='';
  @Input() public class: string='';
  private src$ = new BehaviorSubject(this.src);

  ngOnChanges(): void {
    this.src$.next(this.src);
  }

  // this stream will contain the actual url that our img tag will load
  // everytime the src changes, the previous call would be canceled and the
  // new resource would be loaded
  dataUrl$ = this.src$.pipe(switchMap(url => this.loadImage(url)));

  // we need HttpClient to load the image
  constructor(private httpClient: HttpClient, private domSanitizer: DomSanitizer) {
  }

  private loadImage(url: string): Observable<any> {
    return this.httpClient
      // load the image as a blob
      .get(url, {responseType: 'blob'})
      // create an object url of that blob that we can use in the src attribute
      .pipe(map(e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e))))
  }
}
