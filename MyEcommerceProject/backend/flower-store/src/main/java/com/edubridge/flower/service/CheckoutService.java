package com.edubridge.flower.service;

import com.edubridge.flower.dto.Purchase;
import com.edubridge.flower.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}