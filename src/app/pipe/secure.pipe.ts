import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Subscription } from 'rxjs';

@Pipe({
  name: 'secure',
  standalone: true,
  pure: false,
})
export class SecurePipe implements PipeTransform, OnDestroy  {
  private readonly httpClient = inject(HttpClient);
  private readonly domSanitizer = inject(DomSanitizer);
  private readonly cdr = inject(ChangeDetectorRef);

  private subscription = new Subscription();
  private latestValue!: string | SafeUrl;
  private transformValue = new BehaviorSubject<string>('');

  constructor() {
      // each pipe instance sets up its own subscription
      const transformSubscription = this.transformValue
          .asObservable()
          .pipe(
              filter((v: string | null): v is string => !!v),
              distinctUntilChanged(),
              switchMap((imagePath: string) =>
                  this.httpClient.get(imagePath, { observe: 'response', responseType: 'blob' }).pipe(
                      take(1),
                      map((response: HttpResponse<Blob>) => (response.body !== null ? URL.createObjectURL(response.body) : '')),
                      map((unsafeBlobUrl: string) => this.domSanitizer.bypassSecurityTrustUrl(unsafeBlobUrl)),
                      filter((blobUrl: SafeUrl) => blobUrl !== this.latestValue),
                  ),
              ),
              tap((imagePath: string | SafeUrl) => {
                  // Revoke the object URL if it already exists
                  if (this.latestValue && typeof this.latestValue === 'string') {
                      URL.revokeObjectURL(this.latestValue);
                  }

                  this.latestValue = imagePath;
                  this.cdr.markForCheck();
              }),
          )
          .subscribe();

      this.subscription.add(transformSubscription);
  }
}
