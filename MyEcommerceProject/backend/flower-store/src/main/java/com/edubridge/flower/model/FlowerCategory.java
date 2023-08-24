package com.edubridge.flower.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
public class FlowerCategory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	private String categoryName;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
	private List<Flower> flowers;
}
