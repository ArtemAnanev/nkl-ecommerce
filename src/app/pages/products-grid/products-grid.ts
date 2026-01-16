import {Component, computed, input, signal} from '@angular/core';
import {Product} from "../../models/product";
import {ProductCard} from "../../components/product-card/product-card";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatListItem, MatListItemTitle, MatNavList} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import {TitleCasePipe} from "@angular/common";

@Component({
    selector: 'app-products-grid',
    imports: [ProductCard, MatSidenavContainer, MatSidenavContent, MatSidenav, MatNavList, MatListItem, MatListItemTitle, RouterLink, TitleCasePipe],
    template: `
        <mat-sidenav-container>
            <mat-sidenav mode="side" opened="true">
                <div class="p-6">
                    <h2 class="text-lg text-gray-900">Categories</h2>

                    <mat-nav-list>
                        @for (cat of categories(); track cat) {
                            <mat-list-item
                                    [activated]="cat === category()"
                                    class="my-2"
                                    [routerLink]="['/products', cat]"
                            >
                                <span
                                        matListItemTitle
                                        class="font-medium"
                                        [class]="cat === category() ? '!text-white' : null"
                                >
                                    {{ cat | titlecase }}
                                </span>
                            </mat-list-item>
                        }
                    </mat-nav-list>
                </div>
            </mat-sidenav>
            <mat-sidenav-content class="bg-gray-100 p-6 h-full">
                <h1 class="text-2xl font-bold text-gray-900 mb-6"> {{ category() | titlecase }}</h1>
                <p class="text-base text-gray-600 mb-6">
                    {{ filteredProducts().length }} products found
                </p>
                <div class="responsive-grid">
                    @for (product of filteredProducts(); track product.id) {
                        <app-product-card [product]="product"/>
                    }
                </div>
            </mat-sidenav-content>
        </mat-sidenav-container>
    `,
    styles: `
    `,
})
export default class ProductsGrid {
    category = input<string>('all')

    products = signal<Product[]>([
        {
            id: '1',
            name: 'Laptop Pro X',
            description: 'High-performance laptop with 16GB RAM and 512GB SSD, ideal for developers and designers.',
            price: 1299.99,
            imageUrl: '/images/mouse.jpg',
            rating: 4.7,
            reviewCount: 142,
            inStock: true,
            category: 'mouses',
        },
        {
            id: '2',
            name: 'Wireless Noise-Canceling Headphones',
            description: 'Premium sound quality with long battery life and comfortable fit for all-day use.',
            price: 299.99,
            imageUrl: 'images/kovrik.jpg',
            rating: 4.5,
            reviewCount: 89,
            inStock: true,
            category: 'pads',
        },
        {
            id: '3',
            name: 'Smart Mousepad Series 5',
            description: 'Track fitness, receive notifications, and monitor health with a sleek smartwatch design.',
            price: 249.99,
            imageUrl: 'images/kovrik.jpg',
            rating: 4.3,
            reviewCount: 203,
            inStock: false,
            category: 'pads',
        },
        {
            id: '4',
            name: 'Ultra HD Mouse',
            description: 'Crystal-clear 4K display with wide color gamut for professional photo and video editing.',
            price: 549.99,
            imageUrl: '/images/mouse.jpg',
            rating: 4.8,
            reviewCount: 67,
            inStock: true,
            category: 'mouses',
        },
        {
            id: '5',
            name: 'Mechanical Keyboard RGB',
            description: 'Tactile mechanical keys with customizable backlighting and durable build.',
            price: 129.99,
            imageUrl: '/images/keyboard.jpg',
            rating: 4.6,
            reviewCount: 115,
            inStock: true,
            category: 'keyboards',
        },

    ])

    filteredProducts = computed(() => {
        if (this.category() === 'all') return this.products();
        return this.products().filter((p) => p.category === this.category().toLowerCase());
    })

    categories = signal<string[]>(['all', 'mouses', 'keyboards', 'pads']);
}
