package click.aniwhere.domain.user.service;

import click.aniwhere.domain.user.entity.Login;
import click.aniwhere.domain.user.entity.User;
import click.aniwhere.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        log.info("loadUserByUsername 호출: {}", userId);
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> {
                    log.error("사용자를 찾을 수 없음: {}", userId);
                    return new UsernameNotFoundException("아이디 또는 비밀번호가 일치하지 않습니다.");
                });
        log.info("사용자 찾음: {}, 역할: {}", user.getUserId(), user.getRole());
        return new Login(user.getUserId(), user.getUserPwd(), user.getRole().name());
    }

    public User findByUserId(String userId) {
        log.info("findByUserId 호출: {}", userId);
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + userId));
    }
}
