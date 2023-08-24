import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Flower } from 'src/app/common/flower';
import { CartService } from 'src/app/services/cart.service';
import { FlowerService } from 'src/app/services/flower.service';

@Component({
  selector: 'app-flower-details',
  templateUrl: './flower-details.component.html',
  styleUrls: ['./flower-details.component.css'],
})
export class FlowerDetailsComponent implements OnInit {
  flower = new Flower();

  constructor(
    private flowerService: FlowerService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.handleFlowerDetails();
  }

  handleFlowerDetails() {
    const theFlowerId = this.route.snapshot.paramMap.get('id');
    this.flowerService.getFlower(theFlowerId).subscribe((data) => {
      this.flower = data;
    });
  }

  addProductToCart() {
    this.cartService.addToCart(new CartItem(this.flower));
  }
}
