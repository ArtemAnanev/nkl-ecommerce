import {Component, inject} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {EcommerceStore} from "../../ecommerce-store";
import {MatBadge} from "@angular/material/badge";

@Component({
  selector: 'app-header-actions',
  imports: [MatIconButton, MatIcon, MatButton, RouterLink, MatBadge],
  template: `
    <div class="flex items-center gap-2">
      <button
        matIconButton
        routerLink="/wishlist"
        [matBadge]="store.wishlistCount()"
        [matBadgeHidden]="store.wishlistCount() === 0"
      >
        <mat-icon>favorite</mat-icon>
      </button>
      <button
        matIconButton
        routerLink="/cart"
        [matBadge]="store.cartCount()"
        [matBadgeHidden]="store.cartCount() === 0"
      >
        <mat-icon>shopping_cart</mat-icon>
      </button>
      <button matButton>Sign In</button>
      <button matButton="filled">Sign Up</button>
    </div>
  `,
  styles: ``,
  standalone: true
})
export class HeaderActions {
  store = inject(EcommerceStore)
}
