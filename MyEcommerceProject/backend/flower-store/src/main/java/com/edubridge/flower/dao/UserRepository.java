package com.edubridge.flower.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edubridge.flower.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	User findByUserName(String username);
}
