import {Product} from "./models/product";
import {patchState, signalMethod, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {computed, inject} from "@angular/core";
import {produce} from "immer";
import {Toaster} from "./services/toaster";

export type EcommerceState = {
    products: Product[];
    category: string,
    wishlistItems: Product[];
}

export const EcommerceStore = signalStore(
    {
        providedIn: "root"
    },
    withState({
        products: [
            {
                id: '1',
                name: 'Laptop Pro X',
                description: 'High-performance laptop with 16GB RAM and 512GB SSD, ideal for developers and designers.',
                price: 1299.99,
                imageUrl: 'images/mouse.jpg',
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
                imageUrl: 'images/mouse.jpg',
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
                imageUrl: 'images/keyboard.jpg',
                rating: 4.6,
                reviewCount: 115,
                inStock: true,
                category: 'keyboards',
            },
            {
                id: '6',
                name: 'Laptop Pro X',
                description: 'High-performance laptop with 16GB RAM and 512GB SSD, ideal for developers and designers.',
                price: 1299.99,
                imageUrl: 'images/mouse.jpg',
                rating: 4.7,
                reviewCount: 142,
                inStock: true,
                category: 'mouses',
            },
            {
                id: '7',
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
                id: '8',
                name: 'Mechanical Keyboard RGB',
                description: 'Tactile mechanical keys with customizable backlighting and durable build.',
                price: 129.99,
                imageUrl: 'images/keyboard.jpg',
                rating: 4.6,
                reviewCount: 115,
                inStock: true,
                category: 'keyboards',
            },
        ],
        category: 'all',
        wishlistItems: []
    } as EcommerceState),
    withComputed(({ category, products, wishlistItems }) => ({
        filteredProducts: computed(()=> {
            if (category() === 'all') return products();
            return products().filter((p) => p.category === category().toLowerCase());
        }),
        wishlistCount: computed(()=> wishlistItems().length)
    })),
    withMethods((store, toaster = inject(Toaster))=> ({
        setCategory: signalMethod<string>((category: string)=> {
            patchState(store, {category})
        }),
        addToWishlist: (product: Product)=> {
            const updateWishlistItems = produce(store.wishlistItems(), (draft) => {
                if (!draft.find((p) => p.id === product.id)) {
                    draft.push(product);
                }
            })
            patchState(store, {wishlistItems: updateWishlistItems});
            toaster.success('Product added to Wishlist!');
        },

        removeFromWishlist: (product: Product)=> {
            patchState(store, {
                wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
            });
            toaster.success('Product removed from Wishlist!');
        },

        clearWishlist: ()=> {
            patchState(store, {wishlistItems: []});
        }
    }))
)