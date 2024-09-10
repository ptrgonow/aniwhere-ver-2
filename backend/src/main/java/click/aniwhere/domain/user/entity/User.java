package click.aniwhere.domain.user.entity;

import click.aniwhere.domain.user.dto.UserDTO;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

/**
 * 사용자 엔티티
 * @see UserDTO
 * @see User
 * @see Role
 *
 * */

@Slf4j
@Entity
@Table(name = "user")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private String userId;

    @Column(name = "user_pwd", nullable = false)
    private String userPwd;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "address")
    private String address;

    @Column(name = "detail_address")
    private String detailAddress;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "phone")
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "enum('ROLE_USER', 'ROLE_ADMIN')", nullable = false)
    private Role role = Role.ROLE_USER;

    @Column(name = "is_social", nullable = false)
    private boolean isSocial;

    public static User fromDTO(UserDTO userDTO) {
        return User.builder()
                .id(userDTO.getId())
                .userId(userDTO.getUserId())
                .userPwd(userDTO.getUserPwd())
                .userName(userDTO.getUserName())
                .email(userDTO.getEmail())
                .address(userDTO.getAddress())
                .detailAddress(userDTO.getDetailAddress())
                .zipCode(userDTO.getZipCode())
                .phone(userDTO.getPhone())
                .role(Role.ROLE_USER)
                .isSocial(userDTO.isSocial())
                .build();
    }

    public UserDTO toDTO() {
        return UserDTO.builder()
                .id(id)
                .userId(userId)
                .userPwd(userPwd)
                .userName(userName)
                .email(email)
                .address(address)
                .detailAddress(detailAddress)
                .zipCode(zipCode)
                .phone(phone)
                .isSocial(isSocial)
                .build();
    }

    public enum Role {
        ROLE_USER,
        ROLE_ADMIN
    }
}
