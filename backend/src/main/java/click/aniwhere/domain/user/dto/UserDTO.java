package click.aniwhere.domain.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Builder
public class UserDTO {

    private Long id;
    private String userId;
    private String userPwd;
    private String userName;
    private String email;
    private String address;
    private String detailAddress;
    private String zipCode;
    private String phone;
    private boolean isSocial;
    private String bio;
}
