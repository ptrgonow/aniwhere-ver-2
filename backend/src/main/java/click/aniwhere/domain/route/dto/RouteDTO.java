package click.aniwhere.domain.route.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@Getter
@Builder
public class RouteDTO {

    private Long id;
    private String userId;
    private String name;
    private String description;
    private String image;
    private List<MarkerDTO> markers;

}
