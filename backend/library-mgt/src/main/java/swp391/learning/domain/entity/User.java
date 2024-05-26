package swp391.learning.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.Accessors;
import swp391.learning.domain.enums.EnumTypeGender;
import swp391.learning.domain.enums.EnumTypeRole;
import swp391.learning.domain.enums.EnumTypeStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Accessors(chain = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private EnumTypeRole role;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "full_name")
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private EnumTypeGender gender;

    @Column(name = "date_of_birth")
    private LocalDate date_of_birth;

    @Enumerated(EnumType.STRING)
    private EnumTypeStatus status;

    @Column(name="session_id")
    private Integer session_id;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;
}
