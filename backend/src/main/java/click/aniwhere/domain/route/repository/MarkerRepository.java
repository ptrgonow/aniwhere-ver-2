package click.aniwhere.domain.route.repository;

import click.aniwhere.domain.route.entity.Marker;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarkerRepository extends JpaRepository<Marker, Long> {

    @Query("SELECT m FROM Marker m WHERE m.routeId = :routeId")
    List<Marker> findMarkersByRouteId(@Param("routeId") Long routeId);
}
