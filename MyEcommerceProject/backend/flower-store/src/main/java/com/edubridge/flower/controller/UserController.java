package com.edubridge.flower.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edubridge.flower.dao.UserRepository;
import com.edubridge.flower.model.AuthRequest;
import com.edubridge.flower.model.User;
import com.edubridge.flower.security.JwtUtil;



//@CrossOrigin("http://localhost:4200")
@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class UserController {	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
    private JwtUtil jwtUtil;
	
    @Autowired
    private AuthenticationManager authenticationManager;

	@PostMapping("/user")
	public ResponseEntity<String> saveUser(@RequestBody User user) {
		userRepository.save(user);
		ResponseEntity<String> responseEntity = new ResponseEntity<>("Created", HttpStatus.CREATED);
		return responseEntity;
	}

    @PostMapping("/auth")
    public ResponseEntity<?> generateToken(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword())
            );
        } catch (Exception ex) {
            throw new Exception("inavalid username/password");
        }
        String token = jwtUtil.generateToken(authRequest.getUserName());
        ResponseEntity<?> responseEntity = new ResponseEntity<>(token, HttpStatus.OK);
		return responseEntity;
    }
}
