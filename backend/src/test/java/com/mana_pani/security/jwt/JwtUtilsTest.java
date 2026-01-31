package com.mana_pani.security.jwt;

import com.mana_pani.security.services.UserDetailsImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class JwtUtilsTest {

    @InjectMocks
    private JwtUtils jwtUtils;

    @Mock
    private Authentication authentication;

    @BeforeEach
    void setUp() {
        // Use ReflectionTestUtils to set the private fields injected by @Value
        ReflectionTestUtils.setField(jwtUtils, "jwtSecret", "test-secret-key-that-is-super-long-and-secure");
        ReflectionTestUtils.setField(jwtUtils, "jwtExpirationMs", 86400000L);
        // Manually call the @PostConstruct method
        jwtUtils.init();
    }

    @Test
    void testGenerateJwtToken() {
        // Arrange
        UserDetailsImpl userDetails = new UserDetailsImpl(
            1L,
            "testuser",
            "test@test.com",
            "password",
            Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
        );
        when(authentication.getPrincipal()).thenReturn(userDetails);

        // Act
        String token = jwtUtils.generateJwtToken(authentication);

        // Assert
        assertNotNull(token);
        assertFalse(token.isEmpty());

        // Verify token content
        String username = jwtUtils.getUserNameFromJwtToken(token);
        assertEquals("testuser", username);
        assertTrue(jwtUtils.validateJwtToken(token));
    }

    @Test
    void testValidateJwtToken_InvalidSignature() {
        // Arrange: Generate a token with the correct utility
        UserDetailsImpl userDetails = new UserDetailsImpl(1L, "testuser", "test@test.com", "password", Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        when(authentication.getPrincipal()).thenReturn(userDetails);
        String token = jwtUtils.generateJwtToken(authentication);

        // Act: Create another JwtUtils instance with a wrong secret to validate
        JwtUtils wrongJwtUtils = new JwtUtils();
        ReflectionTestUtils.setField(wrongJwtUtils, "jwtSecret", "a-completely-different-wrong-secret-key");
        wrongJwtUtils.init();

        // Assert
        assertFalse(wrongJwtUtils.validateJwtToken(token));
    }
}
