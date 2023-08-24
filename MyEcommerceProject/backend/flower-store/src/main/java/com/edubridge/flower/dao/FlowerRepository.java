package com.edubridge.flower.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestParam;
import com.edubridge.flower.model.Flower;


@RepositoryRestResource
public interface FlowerRepository extends JpaRepository<Flower, Long> {

	Page<Flower> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
    Page<Flower> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
}
