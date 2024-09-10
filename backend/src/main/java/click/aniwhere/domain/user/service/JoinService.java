package click.aniwhere.domain.user.service;

import click.aniwhere.domain.user.dto.UserDTO;
import click.aniwhere.domain.user.entity.User;
import click.aniwhere.domain.user.repository.UserRepository;
import click.aniwhere.domain.user.validation.UserValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class JoinService {

    private final UserRepository userRepository;
    private final UserValidator userValidator;
    private final PasswordEncoder passwordEncoder;

    public boolean existsByUserId(String userId) {
        return userValidator.existsByUserId(userId);
    }

    public boolean existsByEmail(String email) {
        return userValidator.existsByEmail(email);
    }

    public void register(UserDTO userDTO) {
        if (existsByUserId(userDTO.getUserId())) {
            log.error("이미 존재 하는 사용자 입니다.: {}", userDTO.getUserId());
            throw new IllegalArgumentException("이미 존재 하는 사용자입니다.: " + userDTO.getUserId());
        }
        if (existsByEmail(userDTO.getEmail())) {
            log.error("이미 존재 하는 사용자 입니다.: {}", userDTO.getEmail());
            throw new IllegalArgumentException("이미 존재 하는 사용자입니다.: " + userDTO.getEmail());
        }
        User user = User.fromDTO(userDTO);
        user.setUserPwd(passwordEncoder.encode(user.getUserPwd()));
        userRepository.save(user);
        log.info("{} 님이 회원 가입 하셨습니다.", user.getUserName());
    }
}
