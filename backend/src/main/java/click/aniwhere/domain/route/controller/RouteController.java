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
    @GetMapping("/get/{userId}")
    public List<RouteDTO> getRoutesByUserId(@PathVariable String userId, @RequestParam int limit, @RequestParam int offset) {
        log.info("사용자 경로컨트롤러 get 접근: userId={}, limit={}, offset={}", userId, limit, offset);
        return routeService.getRoutesByUserId(userId, limit, offset);
    }

    /**
     * 사용자의 경로를 추가한다.
     *
     * @param routeDTO 사용자의 경로 정보
     * @return 사용자의 경로 추가 결과
     * */
    @PostMapping("/insert/{userId}")
    public RouteDTO insertRoute(@PathVariable String userId, @RequestBody RouteDTO routeDTO) {
        log.info("사용자 경로컨트롤러 inst 접근: userId={}, routeDTO={}", userId, routeDTO);
        return routeService.insertRoute(userId, routeDTO);
    }

    /**
     * 사용자의 경로를 삭제한다.
     *
     * @param routeId 사용자의 경로 아이디
     * @return 사용자의 경로 삭제 결과
     * */
    @DeleteMapping("/delete/{routeId}")
    public RouteDTO deleteRoute(@PathVariable String routeId) {
        log.info("사용자 경로컨트롤러 del 접근: routeId={}", routeId);
        Long id = Long.parseLong(routeId);
        return routeService.deleteRoute(id);
    }

    /**
     * 사용자의 경로를 수정한다.
     *
     * @param routeId 사용자의 경로 아이디
     * @param routeDTO 사용자의 경로 정보
     * @return 사용자의 경로 수정 결과
     * */
    @PutMapping("/update/{routeId}")
    public RouteDTO updateRoute(@PathVariable String routeId, @RequestBody RouteDTO routeDTO) {
        log.info("사용자 경로컨트롤러 up 접근: routeId={}, routeDTO={}", routeId, routeDTO);
        Long id = Long.parseLong(routeId);
        return routeService.updateRoute(id, routeDTO);
    }

    /**
     * 사용자의 경로 상세정보를 조회한다.
     *
     * @param routeId 사용자의 경로 아이디
     * @return 사용자의 경로 상세정보
     * */
    @GetMapping("/route/details/{routeId}")
    public RouteDTO getRouteDetailsById(@PathVariable String routeId) {
        log.info("사용자 경로컨트롤러 getRouteDetailsById 접근: routeId={}", routeId);
        Long id = Long.parseLong(routeId);
        return routeService.getRouteDetailsById(id);
    }
}
