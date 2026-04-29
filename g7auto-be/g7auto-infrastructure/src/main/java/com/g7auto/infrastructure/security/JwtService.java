package com.g7auto.infrastructure.security;

import com.g7auto.domain.entity.Account;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

  @Value("${jwt.secret}")
  private String secretKey;

  @Value("${jwt.expiration}")
  private long expiration;

  @Value("${jwt.refresh-expiration}")
  private long refreshExpiration;

  public String extractUsername(String token) {
    return extractClaims(token).getSubject();
  }

  public boolean isTokenValid(String token, UserDetails userDetails) {
    try {
      String username = extractUsername(token);
      return username.equals(userDetails.getUsername())
          && !extractClaims(token).getExpiration().before(new Date());
    } catch (Exception e) {
      return false;
    }
  }

  public String generateToken(Account account) {
    return Jwts.builder()
        .subject(account.getUsername())
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + expiration))
        .signWith(getSignInKey())
        .compact();
  }

  public String generateRefreshToken(Account account) {
    return Jwts.builder()
        .subject(account.getUsername())
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + refreshExpiration))
        .signWith(getSignInKey())
        .compact();
  }

  private Claims extractClaims(String token) {
    return Jwts.parser()
        .verifyWith(getSignInKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }

  private SecretKey getSignInKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}
