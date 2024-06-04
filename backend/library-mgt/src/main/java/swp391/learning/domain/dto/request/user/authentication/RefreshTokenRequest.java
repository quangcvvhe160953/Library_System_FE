package swp391.learning.domain.dto.request.user.authentication;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class RefreshTokenRequest {
    @NotBlank
    private String email;
    @NotBlank
    private String refreshToken;
}
