package click.aniwhere.domain.route.entity;

import click.aniwhere.domain.route.dto.RouteDTO;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Entity
@Table(name = "route")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "created_at", nullable = false)
    private String createdAt;

    public RouteDTO toDTO() {
        return RouteDTO.builder()
                .id(this.id)
                .userId(this.userId)
                .name(this.name)
                .description(this.description)
                .image(this.image)
                .build();
    }

    public static Route fromDTO(RouteDTO routeDTO) {
        return Route.builder()
                .id(routeDTO.getId())
                .userId(routeDTO.getUserId())
                .name(routeDTO.getName())
                .description(routeDTO.getDescription())
                .image(routeDTO.getImage())
                .build();
    }

}


