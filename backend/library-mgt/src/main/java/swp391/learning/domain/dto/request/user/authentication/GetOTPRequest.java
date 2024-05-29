package swp391.learning.domain.dto.request.user.authentication;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.validation.constraints.NotBlank;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class GetOTPRequest {
    @NotBlank
    private String email;
    @JsonIgnore
    private boolean isCreate;
}
