package swp391.learning.domain.dto.request.user.authentication;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResendOTPRequest {
    @NotBlank
    private String email;
}
