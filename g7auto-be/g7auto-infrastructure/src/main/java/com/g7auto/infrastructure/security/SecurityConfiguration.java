package com.g7auto.infrastructure.security;

import com.g7auto.core.constant.codes.AuthErrorCode;
import com.g7auto.core.entity.Role;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@Slf4j
@RequiredArgsConstructor
public class SecurityConfiguration {

  private final AuthenticationFilter authenticationFilter;
  private final AuthenticationProvider authenticationProvider;

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    String SA = Role.SUPERADMIN.name();
    String ADMIN = Role.ADMIN.name();
    String DIRECTOR = Role.DIRECTOR.name();
    String SM = Role.SHOWROOM_MANAGER.name();
    String SALES = Role.SALES.name();
    String WAREHOUSE = Role.WAREHOUSE.name();
    String ACCOUNTANT = Role.ACCOUNTANT.name();

    http
        .csrf(AbstractHttpConfigurer::disable)
        .cors(Customizer.withDefaults())
        .authorizeHttpRequests(auth -> auth

            // Public endpoints
            .requestMatchers(HttpMethod.POST,
                "/api/auth/login", "/api/auth/refresh", "/api/auth/init-superadmin")
            .permitAll()
            .requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**")
            .permitAll()

            // ── Accounts (UC21, UC22): Admin manages accounts & permissions ──
            .requestMatchers("/api/accounts/**")
            .hasAnyAuthority(SA, ADMIN)

            // ── Showrooms (UC23): Admin manages showrooms; everyone can read ──
            .requestMatchers(HttpMethod.GET, "/api/showrooms/**")
            .authenticated()
            .requestMatchers("/api/showrooms/**")
            .hasAnyAuthority(SA, ADMIN)

            // ── Employees (UC16): Admin + Showroom Manager manage; Director reads ──
            .requestMatchers(HttpMethod.GET, "/api/employees/**")
            .hasAnyAuthority(SA, ADMIN, DIRECTOR, SM)
            .requestMatchers("/api/employees/**")
            .hasAnyAuthority(SA, ADMIN, SM)

            // ── Car Models (UC01): Admin + Showroom Manager manage; everyone reads ──
            .requestMatchers(HttpMethod.GET, "/api/car-models/**")
            .authenticated()
            .requestMatchers("/api/car-models/**")
            .hasAnyAuthority(SA, ADMIN, SM)

            // ── Cars (UC02 import, UC03 status update) ──
            //    POST (nhập xe)         → Warehouse
            //    PUT/DELETE (cập nhật)  → Warehouse, Sales, Showroom Manager
            //    GET                    → everyone
            .requestMatchers(HttpMethod.GET, "/api/cars/**")
            .authenticated()
            .requestMatchers(HttpMethod.POST, "/api/cars")
            .hasAnyAuthority(SA, ADMIN, WAREHOUSE)
            .requestMatchers("/api/cars/**")
            .hasAnyAuthority(SA, ADMIN, SM, WAREHOUSE, SALES)

            // ── Car Transfers (UC04): Showroom Manager + Warehouse ──
            .requestMatchers("/api/car-transfers/**")
            .hasAnyAuthority(SA, ADMIN, SM, WAREHOUSE)

            // ── Customers (UC06): Sales manages; Showroom Manager oversees ──
            .requestMatchers("/api/customers/**")
            .hasAnyAuthority(SA, ADMIN, SM, SALES)

            // ── Service Histories (UC07): Sales; Showroom Manager monitors ──
            .requestMatchers("/api/service-histories/**")
            .hasAnyAuthority(SA, ADMIN, SM, SALES)

            // ── Test Drives (UC14 book: Sales, UC15 manage: Showroom Manager) ──
            .requestMatchers("/api/test-drives/**")
            .hasAnyAuthority(SA, ADMIN, SM, SALES)

            // ── Quotations (UC09): Sales ──
            .requestMatchers("/api/quotations/**")
            .hasAnyAuthority(SA, ADMIN, SM, SALES)

            // ── Deposits (UC10): Sales + Accountant ──
            .requestMatchers("/api/deposits/**")
            .hasAnyAuthority(SA, ADMIN, SM, SALES, ACCOUNTANT)

            // ── Contracts (UC11 write: Sales; read: Director, Accountant) ──
            .requestMatchers(HttpMethod.GET, "/api/contracts/**")
            .hasAnyAuthority(SA, ADMIN, DIRECTOR, SM, SALES, ACCOUNTANT)
            .requestMatchers("/api/contracts/**")
            .hasAnyAuthority(SA, ADMIN, SM, SALES)

            // ── Payments (UC12 write: Accountant; read: Director) ──
            .requestMatchers(HttpMethod.GET, "/api/payments/**")
            .hasAnyAuthority(SA, ADMIN, DIRECTOR, SM, ACCOUNTANT)
            .requestMatchers("/api/payments/**")
            .hasAnyAuthority(SA, ADMIN, ACCOUNTANT)

            // ── Reports (UC17-20): Director + Showroom Manager ──
            .requestMatchers("/api/reports/**")
            .hasAnyAuthority(SA, ADMIN, DIRECTOR, SM)

            .anyRequest().authenticated()
        )
        .sessionManagement(session ->
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(authenticationFilter,
            UsernamePasswordAuthenticationFilter.class)
        .exceptionHandling(ex -> ex
            .authenticationEntryPoint(unauthorizedEntryPoint())
            .accessDeniedHandler(accessDeniedHandler()));
    return http.build();
  }

  @Bean
  AuthenticationEntryPoint unauthorizedEntryPoint() {
    return (request, response, authException) -> {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      response.setContentType("application/json");
      String body = """
          {
            "code": "%s",
            "data": null
          }
          """.formatted(AuthErrorCode.G7_AUTO_00209);
      log.error("Unauthorized: {}", authException.getMessage());
      response.getWriter().write(body);
    };
  }

  @Bean
  AccessDeniedHandler accessDeniedHandler() {
    return (request, response, accessDeniedException) -> {
      response.setStatus(HttpServletResponse.SC_FORBIDDEN);
      response.setContentType("application/json");
      String body = """
          {
            "code": "%s",
            "data": null
          }
          """.formatted(AuthErrorCode.G7_AUTO_00214);
      log.error("Access denied: {}", accessDeniedException.getMessage());
      response.getWriter().write(body);
    };
  }
}
