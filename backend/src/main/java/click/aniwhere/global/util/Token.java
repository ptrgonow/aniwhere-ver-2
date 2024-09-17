package click.aniwhere.global.util;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Getter
public class Token {

    @Value("${mapbox.access.token}")
    private String mapboxAccessToken;

    @GetMapping("/getMapboxAccessToken")
    public TokenResponse getMapboxAccessToken() {
        return new TokenResponse(mapboxAccessToken);
    }
}
