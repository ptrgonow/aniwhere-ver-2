package click.aniwhere.domain.route.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Entity
@Table(name = "marker")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Marker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "route_id", nullable = false)
    private Long routeId;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    public static Marker of(Long routeId, Double longitude, Double latitude) {
        return Marker.builder()
                .routeId(routeId)
                .longitude(longitude)
                .latitude(latitude)
                .build();
    }

}
