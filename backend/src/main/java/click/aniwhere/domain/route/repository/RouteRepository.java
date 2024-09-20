package click.aniwhere.domain.route.repository;

import click.aniwhere.domain.route.entity.Route;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface RouteRepository extends JpaRepository<Route, Long> {

    @Query("SELECT r FROM Route r WHERE r.userId = :userId")
    List<Route> findRoutesByUserId(@Param("userId") String userId, Pageable pageable);

}
