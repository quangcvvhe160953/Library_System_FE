package swp391.learning.domain.dto.request.user.authentication;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.format.annotation.DateTimeFormat;
import swp391.learning.domain.enums.EnumTypeGender;
import swp391.learning.domain.enums.EnumTypeRole;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserRequest {
    @NotBlank
    private String password;
    @NotBlank
    private String email;
    @NotBlank
    private String phone;

    private EnumTypeRole role = EnumTypeRole.MEMBER;
    private String fullName;
    @NotNull
    private EnumTypeGender gender;
    @NotNull
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate dateOfBirth;


}
