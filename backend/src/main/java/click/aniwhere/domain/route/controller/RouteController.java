package click.aniwhere.domain.route.controller;

import click.aniwhere.domain.route.dto.RouteDTO;
import click.aniwhere.domain.route.service.RouteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/route")
@RequiredArgsConstructor
public class RouteController {

    private final RouteService routeService;

    @GetMapping("/photos/{userId}")
    public List<RouteDTO> getRoutesByUserId(@PathVariable String userId, @RequestParam int limit, @RequestParam int offset) {
        log.info("사용자 경로컨트롤러 접근: userId={}, limit={}, offset={}", userId, limit, offset);
        return routeService.getRoutesByUserId(userId, limit, offset);
    }
}
