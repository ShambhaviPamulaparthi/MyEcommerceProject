package com.edubridge.flower.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Flower {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String sku;

	private String name;

	private BigDecimal price;

	private String imageUrl;

	private String description;
	
	private String productInfo;

	private int quantity;
	
	@ManyToOne
	@JoinColumn(name="category_id", nullable=false)
	private FlowerCategory category;

}
