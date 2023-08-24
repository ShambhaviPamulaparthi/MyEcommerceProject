package com.edubridge.flower.dto;

import lombok.Data;

import java.util.Set;

import com.edubridge. flower.model.Address;
import com.edubridge. flower.model.Customer;
import com.edubridge. flower.model.Order;
import com.edubridge. flower.model.OrderItem;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
