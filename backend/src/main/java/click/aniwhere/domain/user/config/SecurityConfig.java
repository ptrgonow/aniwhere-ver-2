package click.aniwhere.domain.user.config;

import click.aniwhere.domain.user.controller.UserController;
import click.aniwhere.domain.user.repository.UserRepository;
import click.aniwhere.domain.user.service.JoinService;
import click.aniwhere.domain.user.service.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
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

            "/",
            "/frontend/**",
            "/public/**",
            "/index.html",
            "/favicon.ico",
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
            "/user/login"
    };

    /**
     * 사용자 인증 요소 접근 인가 목록
     *
     * @see LoginService
     * @see UserController
     */
    private static final String[] USER_AUTH_WHITELIST = {

            "/user/info",
            "/user/logout"
    };

    /**
     * 사용자 메인 페이지 경로
     *
     * @see UserController
     */
    private static final String[] USER_MAIN_PAGE = {
            "/user/{userId}",
            "/route/photos/{userId}"
    };

    private final SuccessHandler successHandler;
    private final FailureHandler failureHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers(AUTH_WHITELIST).permitAll()
                                .requestMatchers(USER_WHITELIST).permitAll()
                                .requestMatchers(USER_AUTH_WHITELIST).hasRole("USER")
                                .requestMatchers(USER_MAIN_PAGE).authenticated()
                                .anyRequest().authenticated()
                )
                .formLogin(formLogin -> formLogin
                        .loginProcessingUrl("/user/login")
                        .usernameParameter("userId")
                        .passwordParameter("userPwd")
                        .successHandler(successHandler)
                        .failureHandler(failureHandler)
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
