package com.edubridge.flower.controller;

import com.edubridge.flower.dto.Purchase;
import com.edubridge.flower.dto.PurchaseResponse;
import com.edubridge.flower.service.CheckoutService;

import org.springframework.web.bind.annotation.*;

//@CrossOrigin("http://localhost:4200")
@CrossOrigin("*")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }

}