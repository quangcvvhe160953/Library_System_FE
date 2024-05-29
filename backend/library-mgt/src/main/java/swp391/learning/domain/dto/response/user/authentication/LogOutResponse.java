package swp391.learning.domain.dto.response.user.authentication;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LogOutResponse {
    @NotBlank
    private String username;
    @NotNull
    private int sessionID;
}
