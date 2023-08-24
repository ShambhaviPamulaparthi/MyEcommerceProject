package com.edubridge.flower.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Address {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String street;

	private String city;

	private String state;

	private String country;

	private String zipCode;

	@OneToOne
	@PrimaryKeyJoinColumn
	private Order order;

}
