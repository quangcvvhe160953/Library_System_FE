package swp391.learning.domain.dto.response.user.authentication;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class GetOTPResponse {
    private String username;
    private String email;
}