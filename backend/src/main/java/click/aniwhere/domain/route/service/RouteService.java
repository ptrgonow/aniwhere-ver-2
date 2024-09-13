package click.aniwhere.domain.route.service;

import click.aniwhere.domain.route.dto.RouteDTO;
import click.aniwhere.domain.route.entity.Route;
import click.aniwhere.domain.route.repository.RouteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RouteService {

    private final RouteRepository routeRepository;


    public List<RouteDTO> getRoutesByUserId(String userId, int limit, int offset) {
        Pageable pageable = PageRequest.of(offset, limit);
        log.info("사용자 경로서비스 접근: userId={}, limit={}, offset={}", userId, limit, offset);
        return routeRepository.findRoutesByUserId(userId, pageable)
                .stream()
                .map(Route::toDTO)
                .collect(Collectors.toList());
    }

}
