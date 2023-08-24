import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Flower } from 'src/app/common/flower';
import { CartService } from 'src/app/services/cart.service';
import { FlowerService, GetResponseFlowers } from 'src/app/services/flower.service';

@Component({
  selector: 'app-flowers-list',
  templateUrl: './flowers-list.component.html',
  styleUrls: ['./flowers-list.component.css'],
})
export class FlowersListComponent implements OnInit {
  flowers: Flower[] = [];
  currentCategoryId: any;
  previousCategoryId: any;
  searchMode: boolean;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 4;
  theTotalElements: number = 0;

  previousKeyword: string | null = null;

  constructor(
    private flowerService: FlowerService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listFlowers();
    });
  }

  // listFlowers() {
  //   //checking router parameter
  //   const hasCategoryId = this.route.snapshot.paramMap.has('id');

  //   if (hasCategoryId) {
  //     //Reading route parameter
  //     this.currentCategoryId = this.route.snapshot.paramMap.get('id');
  //   } else {
  //     this.currentCategoryId = 1;
  //   }

  //   this.flowerService
  //     .getFlowerList(this.currentCategoryId)
  //     .subscribe((data) => {
  //       this.flowers = data;
  //       console.log(data);
  //     });
  // }
  listFlowers() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      //search flowers
      this.handleSearchFlowers();
    } else {
      //list of flowers
      this.handleListFlowers();
    }
  }

 /* handleSearchFlowers() {
    const theKeyword: string | null =
      this.route.snapshot.paramMap.get('keyword');

    this.flowerService.searchFlowers(theKeyword).subscribe((data) => {
      this.flowers = data;
    });
  }

  handleListFlowers() {
    //checking router parameter
    const hasCategoryId = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //Reading route parameter
      this.currentCategoryId = this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    
    this.flowerService
      .getFlowerList(this.currentCategoryId)
      .subscribe((data) => {
        this.flowers = data;
        console.log(data);
      });
}
}*/
handleListFlowers() {
  //checking router parameter
  const hasCategoryId = this.route.snapshot.paramMap.has('id');

  if (hasCategoryId) {
    //Reading route parameter
    this.currentCategoryId = this.route.snapshot.paramMap.get('id');
  } else {
    this.currentCategoryId = 1;
  }

  if (this.previousCategoryId != this.currentCategoryId) {
    this.thePageNumber = 1;
  }

  this.previousCategoryId = this.currentCategoryId;

  //Calling FlowerService
  this.flowerService
    .getFlowerListPaginate(
      this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId
    )
    .subscribe(this.processResult());
}

handleSearchFlowers() {
  const theKeyword: any = this.route.snapshot.paramMap.get('keyword');

  if (this.previousKeyword != theKeyword) {
    this.thePageNumber = 1;
  }

  this.previousKeyword = theKeyword;

  //Calling ProductService
  this.flowerService
    .searchFlowersPaginate(
      this.thePageNumber - 1,
      this.thePageSize,
      theKeyword
    )
    .subscribe(this.processResult());
}

processResult() {
  return (data: GetResponseFlowers) => {
    this.flowers = data._embedded.flowers;
    this.thePageNumber = data.page.number + 1;
    this.thePageSize = data.page.size;
    this.theTotalElements = data.page.totalElements;
  };
}

addProductToCart(theFlower: Flower) {
  const theCartItem = new CartItem(theFlower);
  this.cartService.addToCart(theCartItem);
}
}