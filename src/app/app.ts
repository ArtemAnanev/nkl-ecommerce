import {Component, signal} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {Header} from "./layout/header/header";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Header],
    template: `
        <app-header/>
        <router-outlet/>
    `,
    styleUrl: './app.scss'
})
export class App {
    protected readonly title = signal('nkl-ecommerce');
}
