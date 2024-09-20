package click.aniwhere.domain.route.service;

import click.aniwhere.domain.route.dto.MarkerDTO;
import click.aniwhere.domain.route.dto.RouteDTO;
import click.aniwhere.domain.route.entity.Route;
import click.aniwhere.domain.route.entity.Marker;
import click.aniwhere.domain.route.repository.MarkerRepository;
import click.aniwhere.domain.route.repository.RouteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RouteService {

    private final RouteRepository routeRepository;
    private final MarkerRepository markerRepository;

    @Transactional
    public List<RouteDTO> getRoutesByUserId(String userId, int limit, int offset) {
        Pageable pageable = PageRequest.of(offset, limit);
        log.info("사용자 경로서비스 get 접근: userId={}, limit={}, offset={}", userId, limit, offset);
        return routeRepository.findRoutesByUserId(userId, pageable)
                .stream()
                .map(Route::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public RouteDTO insertRoute(String userId, RouteDTO routeDTO) {
        log.info("사용자 경로서비스 inst 접근: userId={}, routeDTO={}", userId, routeDTO);

        Route route = Route.fromDTO(routeDTO);
        route.setUserId(userId);
        Route savedRoute = routeRepository.save(route);

        return savedRoute.toDTO();
    }

    @Transactional
    public RouteDTO deleteRoute(Long routeId) {
        log.info("사용자 경로서비스 del 접근: routeId={}", routeId);
        Route route = routeRepository.findById(routeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 경로입니다."));

        routeRepository.delete(route);
        return route.toDTO();
    }

    @Transactional
    public RouteDTO updateRoute(Long id, RouteDTO routeDTO) {
        log.info("사용자 경로서비스 up 접근: id={}, routeDTO={}", id, routeDTO);
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 경로입니다."));
        route.update(routeDTO);
        Route savedRoute = routeRepository.save(route);
        return savedRoute.toDTO();
    }

    @Transactional
    public RouteDTO getRouteDetailsById(Long routeId) {
        log.info("사용자 경로서비스 getRouteDetailsById 접근: routeId={}", routeId);
        Route route = routeRepository.findById(routeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 경로입니다."));

        List<MarkerDTO> markers = markerRepository.findMarkersByRouteId(routeId)
                .stream()
                .map(Marker::toDTO)
                .collect(Collectors.toList());

        route.setMarkers(markers);

        return route.toDTO();
    }
}
