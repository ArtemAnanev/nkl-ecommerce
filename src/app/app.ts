import {Component, signal} from '@angular/core';

@Component({
    selector: 'app-root',
    imports: [],
    template: `
        <h1 class="bg-red-50 text-3xl font-bold underline">Hello world!</h1>
    `,
    styleUrl: './app.scss'
})
export class App {
    protected readonly title = signal('nkl-ecommerce');
}
