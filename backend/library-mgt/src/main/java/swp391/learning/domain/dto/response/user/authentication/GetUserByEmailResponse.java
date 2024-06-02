package swp391.learning.domain.dto.response.user.authentication;

import lombok.*;
import swp391.learning.domain.enums.EnumTypeGender;
import swp391.learning.domain.enums.EnumTypeRole;
import swp391.learning.domain.enums.EnumTypeStatus;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class GetUserByEmailResponse {
    @NotNull
    private int id;
    @NotBlank
    private String username;
    @NotBlank
    private String email;
    @NotBlank
    private String phone;
    @NotNull
    private EnumTypeRole role;
    @NotNull
    private LocalDateTime createdAt;
    @NotBlank
    private String fullName;
    @NotNull
    private EnumTypeGender gender;
    @NotNull
    private LocalDate date_of_birth;
    @NotNull
    private EnumTypeStatus status;
}
