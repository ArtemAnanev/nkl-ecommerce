import {Component, computed, input, signal} from '@angular/core';
import {Product} from "../../models/product";
import {ProductCard} from "../../components/product-card/product-card";

@Component({
    selector: 'app-products-grid',
    imports: [
        ProductCard
    ],
    template: `
        <div class="bg-gray-100 p-6">
            <h1 class="text-2xl font-bold text-gray-900 mb-6"> {{ category() }}</h1>
            <div class="responsive-grid">
                @for (product of filteredProducts(); track product.id) {
                    <app-product-card [product]="product"/>
                }
            </div>
        </div>
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
            category: 'Mouses',
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
            category: 'Mousepads',
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
            category: 'Mousepads',
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
            category: 'Mouses',
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
            category: 'Keyboards',
        },

    ])

    filteredProducts = computed(() => {
        if (this.category() === 'all') return this.products();
        return this.products().filter(p => p.category === this.category().toLowerCase());
    })

}
