import {Product} from "./models/product";
import {patchState, signalMethod, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {computed, inject} from "@angular/core";
import {produce} from "immer";
import {Toaster} from "./services/toaster";
import {CartItem} from './models/cart';
import {MatDialog} from '@angular/material/dialog';
import {SignInDialog} from './components/sign-in-dialog/sign-in-dialog';
import {SignInParams, SignUpParams, User} from './models/user';
import {Router} from '@angular/router';
import {Order} from './models/order';
import {withStorageSync} from '@angular-architects/ngrx-toolkit'

export type EcommerceState = {
  products: Product[];
  category: string,
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  loading: boolean;
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
        imageUrl: 'images/keyboard.png',
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
        imageUrl: 'images/keyboard.png',
        rating: 4.6,
        reviewCount: 115,
        inStock: true,
        category: 'keyboards',
      },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
  } as EcommerceState),
  withStorageSync({
    key: 'modern-store',
    select: ({wishlistItems, cartItems, user}) => ({wishlistItems, cartItems, user}),
  }),
  withComputed(({category, products, wishlistItems, cartItems}) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return products();
      return products().filter((p) => p.category === category().toLowerCase());
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
  })),
  withMethods((store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
    setCategory: signalMethod<string>((category: string) => {
      patchState(store, {category})
    }),
    addToWishlist: (product: Product) => {
      const updateWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find((p) => p.id === product.id)) {
          draft.push(product);
        }
      })
      patchState(store, {wishlistItems: updateWishlistItems});
      toaster.success('Product added to Wishlist!');
    },

    removeFromWishlist: (product: Product) => {
      patchState(store, {
        wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
      });
      toaster.success('Product removed from Wishlist!');
    },

    clearWishlist: () => {
      patchState(store, {wishlistItems: []});
    },

    addToCart: (product: Product, quantity = 1) => {
      const existingItemIndex = store.cartItems().findIndex(i => i.product.id === product.id);

      const updatedCartItems = produce(store.cartItems(), (draft) => {
        if (existingItemIndex !== -1) {
          draft[existingItemIndex].quantity += quantity;
          return;
        }

        draft.push({product, quantity});
      })

      patchState(store, {cartItems: updatedCartItems});

      toaster.success(existingItemIndex !== -1 ? 'Product added again' : 'Product added to the Cart');

    },

    setItemQuantity(params: { productId: string, quantity: number }) {
      const index = store.cartItems().findIndex(c => c.product.id === params.productId);
      const updated = produce(store.cartItems(), (draft) => {
        draft[index].quantity = params.quantity
      })

      patchState(store, {cartItems: updated});
    },

    addAllWishlistToCart: () => {
      const updatedCartItems = produce(store.cartItems(), (draft) => {
        store.wishlistItems().forEach(p => {
          if (!draft.find(c => c.product.id === p.id)) {
            draft.push({product: p, quantity: 1});
          }
        })
      })

      patchState(store, {cartItems: updatedCartItems, wishlistItems: []})
    },

    moveToWishlist: (product: Product) => {
      const updatedCartItems = store.cartItems().filter((p => p.product.id !== product.id));
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find((p) => p.id === product.id)) {
          draft.push(product);
        }
      })
      patchState(store, {cartItems: updatedCartItems, wishlistItems: updatedWishlistItems})
    },

    removeFromCart: (product: Product) => {
      patchState(store, {cartItems: store.cartItems().filter((c) => c.product.id !== product.id)})
    },

    proceedToCheckout: () => {
      if (!store.user()) {
        matDialog.open(SignInDialog, {
          disableClose: true,
          data: {
            checkout: true
          }
        })
        return
      }
      router.navigate(['/checkout'])
    },

    placeOrder: async () => {
      patchState(store, {loading: true})
      const user = store.user();
      if (!user) {
        toaster.error('Please login before placing order')
        patchState(store, {loading: false})
        return;
      }
      const order: Order = {
        id: crypto.randomUUID(),
        userId: user.id,
        total: Math.round(store
          .cartItems()
          .reduce((acc, item) => acc + item.quantity * item.product.price, 0)),
        items: store.cartItems(),
        paymentStatus: 'success',
      };
      await new Promise((resolve) => setTimeout(resolve, 1000));
      patchState(store, {loading: false, cartItems: []});
      router.navigate(['/order-success'])
    },

    signIn: ({email, password, checkout, dialogId}: SignInParams) => {
      patchState(store, {
        user: {
          id: '1',
          email,
          name: 'John Doe',
          imageUrl: 'images/user1.jpg'
        }
      })
      const dialog = matDialog.getDialogById(dialogId)?.close()
      if (checkout) {
        router.navigate(['/checkout'])
      }
    },

    signUp: ({email, password, name, checkout, dialogId}: SignUpParams) => {
      patchState(store, {
        user: {
          id: '1',
          email,
          name: 'John Doe',
          imageUrl: 'images/user1.jpg'
        }
      })
      const dialog = matDialog.getDialogById(dialogId)?.close()
      if (checkout) {
        router.navigate(['/checkout'])

      }
    },

    signOut: () => {
      patchState(store, {user: undefined})
    },

  }))
)
