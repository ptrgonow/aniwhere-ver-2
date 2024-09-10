package click.aniwhere.domain.user.config;

import click.aniwhere.domain.user.controller.UserController;
import click.aniwhere.domain.user.repository.UserRepository;
import click.aniwhere.domain.user.service.JoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Spring Security 설정 클래스
 *
 * @see JoinService
 * @see UserController
 * @see UserRepository
 * @author Patrick
 * @since 24.09.10
 * @version 1.0
 */


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    /**
     * 공통 요소 접근 인가 목록
     * 경로:
     * "/frontend/public”
     *
     */
    private static final String[] AUTH_WHITELIST = {

            "/frontend/**",
            "/public/**",
            "/index.html",
            "/favicon.ico",
            "/manifest.json",
            "/logo192.png",
            "/logo512.png",
            "/ws/**"

    };

    /**
     * 사용자 요소 접근 인가 목록
     *
     * @see JoinService
     * @see UserController
     */
    private static final String[] USER_WHITELIST = {

            "/user/register",
            "/user/login",
            "/user/logout"

    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers(AUTH_WHITELIST).permitAll()
                                .requestMatchers(USER_WHITELIST).permitAll()
                                .anyRequest().authenticated()
                )
                .formLogin(formLogin -> formLogin
                        .loginPage("/login")
                        .loginProcessingUrl("/user/login")
                        .usernameParameter("username")
                        .passwordParameter("password")
                        .defaultSuccessUrl("/", true)
                        .failureUrl("/login?error=true")
                        .permitAll()
                )

                /*.oauth2Login(oauth2Login -> oauth2Login
                        .loginPage("/oauth2/login")
                        .defaultSuccessUrl("/")
                        .failureUrl("/login?error=true")
                        .permitAll()
                )*/

                .logout(logout -> logout
                        .logoutUrl("/user/logout")
                        .logoutSuccessUrl("/login?logout=true&message=logoutSuccess")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .permitAll()
                )

                .headers(headers -> headers
                        .contentSecurityPolicy(csp -> csp
                                .policyDirectives("upgrade-insecure-requests")
                        ));

        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}
