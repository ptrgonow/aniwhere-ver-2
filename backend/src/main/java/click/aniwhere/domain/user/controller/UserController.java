package click.aniwhere.domain.user.controller;

import click.aniwhere.domain.user.dto.UserDTO;
import click.aniwhere.domain.user.service.JoinService;
import click.aniwhere.domain.user.service.UserService;
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

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final JoinService joinService;
    private final UserService userService;

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

    /**
     * 사용자 메인 페이지 접근
     *
     * @param userId 사용자 ID
     *               <p>- 현재 로그인한 사용자의 ID 또는 다른 사용자의 ID</p>
     *               <p>- 현재 로그인한 사용자의 ID는 Authentication 객체에서 가져올 수 있음</p>
     *               <p>- 다른 사용자의 ID는 URL 경로에서 가져올 수 있음</p>
     * @param authentication 현재 로그인한 사용자의 인증 정보
     * @return ResponseEntity<String>
     *              <p>- 사용자 접근 허용: HttpStatus.OK</p>
     *              <p>- 접근 거부: HttpStatus.FORBIDDEN</p>
     *              <p>- 인증 필요: HttpStatus.UNAUTHORIZED</p>
     *              <p>- 인증 실패: HttpStatus.UNAUTHORIZED</p>
     *              <p>- 기타 오류: HttpStatus.INTERNAL_SERVER_ERROR</p>
     * */
    @GetMapping("/{userId}")
    public ResponseEntity<?> mainPage(@PathVariable String userId, Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            // 자신의 페이지 또는 다른 사용자의 페이지 모두 접근 허용
            if (userId.equals(authentication.getName()) || true) {
                try {
                    UserDTO userDTO = userService.getUserInfo(userId);
                    log.info("사용자 {} 메인 페이지 접근", userId);
                    return ResponseEntity.ok().body(userDTO);
                } catch (IllegalArgumentException e) {
                    log.error("사용자 정보 조회 실패: {}", e.getMessage());
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("사용자 정보 조회 실패");
                }
            } else {
                log.warn("사용자 {} 메인 페이지 접근 거부", userId);
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("접근 거부");
            }
        } else {
            log.warn("사용자 {} 인증되지 않은 접근 시도", userId);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 필요");
        }
    }

    /**
     * 사용자 소개글 수정
     *
     * @param userId 사용자 ID
     *               <p>- 현재 로그인한 사용자의 ID 또는 다른 사용자의 ID</p>
     *               <p>- 현재 로그인한 사용자의 ID는 Authentication 객체에서 가져올 수 있음</p>
     *               <p>- 다른 사용자의 ID는 URL 경로에서 가져올 수 있음</p>
     * @param bio 사용자 소개글
     * @return ResponseEntity<Void>
     *              <p>- 소개글 수정 성공: HttpStatus.OK</p>
     *              <p>- 소개글 수정 실패: HttpStatus.BAD_REQUEST</p>
     * */
    @PutMapping("/bio/{userId}")
    public ResponseEntity<Void> updateBio(@PathVariable String userId, @RequestBody Map<String, String> requestBody) {
        String bio = requestBody.get("bio");
        userService.saveBio(userId, bio);
        return ResponseEntity.ok().build();
    }

}
