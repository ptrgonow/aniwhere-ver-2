package click.aniwhere.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import click.aniwhere.domain.user.entity.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUserId(String userId);
    boolean existsByEmail(String email);
    Optional<User> findByUserId(String userId);
    Optional<User> findByEmail(String email);

}
