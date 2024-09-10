package click.aniwhere.domain.user.controller;

import click.aniwhere.domain.user.dto.UserDTO;
import click.aniwhere.domain.user.service.JoinService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
}
