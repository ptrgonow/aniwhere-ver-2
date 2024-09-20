package click.aniwhere.domain.route.entity;

import click.aniwhere.domain.route.dto.MarkerDTO;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Entity
@Table(name = "marker")
@Builder
@Getter
@Setter
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

    public MarkerDTO toDTO() {
        return MarkerDTO.builder()
                .id(this.id)
                .routeId(this.routeId)
                .longitude(this.longitude)
                .latitude(this.latitude)
                .build();
    }
}
