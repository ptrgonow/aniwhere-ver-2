package click.aniwhere.domain.user.service;

import click.aniwhere.domain.user.dto.UserDTO;
import click.aniwhere.domain.user.entity.User;
import click.aniwhere.domain.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // 아이디를 이용해 사용자 정보를 조회하는 메소드
    public UserDTO getUserInfo(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        return user.toDTO();
    }

    // 아이디를 이용해 bio를 저장하는 메소드
    public void saveBio(String userId, String bio) {
        String parsedBio = bio.trim();
        if (parsedBio.length() > 20) {
            throw new IllegalArgumentException("자기소개는 20자 이내로 작성해주세요.");
        }
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        user.setBio(parsedBio);
        userRepository.save(user);
    }

}
