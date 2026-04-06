import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-error-500',
    templateUrl: './error-500.component.html',
    styleUrls: ['./error-500.component.scss']
})
export class Error500Component {
    constructor(
        private router: Router,
        private location: Location
    ) { }

    retry(): void {
        window.location.reload();
    }

    goHome(): void {
        this.router.navigate(['/']);
    }
}
