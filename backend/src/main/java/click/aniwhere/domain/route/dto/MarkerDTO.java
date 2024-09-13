package click.aniwhere.domain.route.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Builder
public class MarkerDTO {

    private Long id;
    private Long routeId;
    private Double longitude;
    private Double latitude;
}
