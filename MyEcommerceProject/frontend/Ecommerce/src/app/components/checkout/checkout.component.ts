import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { Purchase } from 'src/app/common/purchase';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  totalPrice = 0.0;
  totalQuantity = 0;

  constructor(
    private formBuilder: FormBuilder,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        name: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-zA-z]*$'),
          ],
        ],
        mobile: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]{10}$'),
          ],
        ],
       
        email: ['', [Validators.required, Validators.email]],
      }),
      shippingAddress: this.formBuilder.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      }),
      billingAddress: this.formBuilder.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      }),
      creditCard: this.formBuilder.group({
        cardType: ['', [Validators.required]],
        nameOnCard: ['', [Validators.required]],
        cardNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{16}$')],
        ],
        securityCode: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{3}$')],
        ],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    this.reviewCartDetails();

    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log('startMonth: ' + startMonth);

    this.checkoutService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieved credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });

    // populate credit card years
    this.checkoutService.getCreditCardYears().subscribe((data) => {
      console.log('Retrieved credit card years: ' + JSON.stringify(data));
      this.creditCardYears = data;
    });

    // populate countries
    this.checkoutService.getCountries().subscribe((data) => {
      console.log('Retrieved countries: ' + JSON.stringify(data));
      this.countries = data;
    });
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls?.['billingAddress'].setValue(
        this.checkoutFormGroup.controls?.['shippingAddress'].value
      );
      // bug fix for states
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls?.['billingAddress'].reset();
      // bug fix for states
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup?.value.expirationYear
    );

    // if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.checkoutService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieved credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.checkoutService.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }

      // select first item by default
      formGroup?.get('state')?.setValue(data[0]);
    });
  }

  //Customer Getter Methods
  get name() {
    return this.checkoutFormGroup.get('customer.name');
  }

  get mobile() {
    return this.checkoutFormGroup.get('customer.mobile');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  //Shipping Address Getter methods
  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }
  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  //Billing Address Getter methods
  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }
  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  //CreditCard Getter Methods
  get creditCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }
  get creditCardNameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }
  get creditCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  get creditCardSecurityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }

  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe((data) => {
      this.totalQuantity = data;
    });

    this.cartService.totalPrice.subscribe((data) => {
      this.totalPrice = data;
    });
  }

  onSubmit() {
    //alert('form is submitted');
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
  

  let purchase = new Purchase();
  purchase.customer = this.checkoutFormGroup.controls['customer'].value;
  purchase.shippingAddress =
    this.checkoutFormGroup.controls['shippingAddress'].value;
  const shippingState = JSON.parse(
    JSON.stringify(purchase.shippingAddress.state)
  );
  const shippingCountry = JSON.parse(
    JSON.stringify(purchase.shippingAddress.country)
  );
  purchase.shippingAddress.state = shippingState.name;
  purchase.shippingAddress.country = shippingCountry.name;

  purchase.billingAddress =
    this.checkoutFormGroup.controls['billingAddress'].value;
  const billingState = JSON.parse(
    JSON.stringify(purchase.billingAddress.state)
  );
  const billingCountry = JSON.parse(
    JSON.stringify(purchase.billingAddress.country)
  );
  purchase.billingAddress.state = billingState.name;
  purchase.billingAddress.country = billingCountry.name;

  let order = new Order();
  order.totalPrice = this.totalPrice;
  order.totalQuantity = this.totalQuantity;

  purchase.order = order;

  let cartItems = this.cartService.cartItems;

  let orderItems: OrderItem[] = cartItems.map(
    (cartItem) => new OrderItem(cartItem)
  );
  purchase.orderItems = orderItems;

  this.checkoutService.placeOrder(purchase).subscribe(
    (response: Purchase) => {
      alert(
        `Your order is processed!\n Order Tracking No:${response.orderTrackingNumber}`
      );
      //reset cart
      this.resetCart();
    },
    (err) => {
      alert('Something is wrong!');
    }
  );
}

resetCart() {
  this.cartService.cartItems = [];
  this.cartService.totalPrice.next(0);
  this.cartService.totalQuantity.next(0);
  this.checkoutFormGroup.reset();
  this.router.navigateByUrl('/flowers');
}
}
