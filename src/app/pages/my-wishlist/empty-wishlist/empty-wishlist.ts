import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-empty-wishlist',
  imports: [
    MatIcon,
    MatButton,
    RouterLink
  ],
  template: `
    <div class="flex flex-col items-center justify-center py-16 text-center">
        <!-- Heart Icon -->
      <div class="w-20 h-20 mb-8 rounded-full bg-gray-100 flex items-center justify-center">
        <mat-icon class="text-gray-400 transform scale-150">favorite_border</mat-icon>
      </div>

        <!-- Message -->

      <h2 class="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h2>
      <p class="text-gray-600 mb-8">Save items you like </p>

      <!-- Start shopping button -->
      <button matButton="filled" routerLink="/products/all" class="min-w-50 py-3">
        Return to shopping
      </button>
      
    </div>
  `,
  styles: ``,
})
export class EmptyWishlist {

}
