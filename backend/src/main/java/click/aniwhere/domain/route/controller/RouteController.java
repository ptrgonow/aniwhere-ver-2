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

    /**
     * 사용자의 경로를 조회한다.
     *
     * @param userId 사용자 아이디
     * @param limit 조회할 데이터 수
     * @param offset 조회할 데이터 시작점
     * @return 사용자의 경로 리스트
     * */
    @GetMapping("/photos/{userId}")
    public List<RouteDTO> getRoutesByUserId(@PathVariable String userId, @RequestParam int limit, @RequestParam int offset) {
        log.info("사용자 경로컨트롤러 접근: userId={}, limit={}, offset={}", userId, limit, offset);
        return routeService.getRoutesByUserId(userId, limit, offset);
    }
}
