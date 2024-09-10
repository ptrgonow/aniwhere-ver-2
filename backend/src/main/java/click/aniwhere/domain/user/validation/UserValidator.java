package click.aniwhere.domain.user.validation;

import click.aniwhere.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserValidator {

    private final UserRepository userRepository;

    /**
     * 유저 정보 벨리데이션
     *
     * @param userId 유저 아이디
     */
    public boolean existsByUserId(String userId) {
        return userRepository.existsByUserId(userId);
    }

    /**
     * 유저 정보 벨리데이션
     *
     * @param email 유저 이메일
     */
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }


}
