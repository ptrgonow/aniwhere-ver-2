package click.aniwhere.domain.user.controller;

import click.aniwhere.domain.user.dto.UserDTO;
import click.aniwhere.domain.user.service.JoinService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final JoinService joinService;

    @PostMapping("/register")
    public ResponseEntity<String> join(@RequestBody UserDTO userDTO) {
        try {
            joinService.register(userDTO);
            log.info("{} 님이 회원 가입 하셨습니다.", userDTO.getUserName());
            return ResponseEntity.status(HttpStatus.OK).body("회원 가입 성공");
        } catch (IllegalArgumentException e) {
            log.error("회원 가입 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkSession() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();

        if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
            log.info("유효한 세션 확인: {}", authentication.getPrincipal());
            return ResponseEntity.ok().body("세션 유효");
        } else {
            log.info("세션이 유효하지 않음");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션 만료 또는 유효하지 않음");
        }
    }

}
