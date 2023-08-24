package com.edubridge.flower.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.edubridge.flower.model.FlowerCategory;

@RepositoryRestResource(collectionResourceRel = "flowerCategory", path = "flower-category")
public interface FlowerCategoryRepository extends JpaRepository<FlowerCategory,Long>{

}
