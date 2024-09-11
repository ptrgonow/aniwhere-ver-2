package click.aniwhere.domain.user.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class FailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {
        log.error("로그인 실패: {}", exception.getMessage());
        log.error("실패 원인: ", exception);

        if (exception instanceof BadCredentialsException) {
            log.error("잘못된 자격 증명");
        } else if (exception instanceof LockedException) {
            log.error("계정 잠김");
        } else if (exception instanceof DisabledException) {
            log.error("계정 비활성화");
        } else if (exception instanceof AccountExpiredException) {
            log.error("계정 만료");
        } else if (exception instanceof CredentialsExpiredException) {
            log.error("자격 증명 만료");
        }

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write("{\"error\": \"" + exception.getMessage() + "\"}");
    }
}
