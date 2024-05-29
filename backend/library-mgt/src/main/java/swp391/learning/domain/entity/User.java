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
    private String phone; // số điện thoại

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private EnumTypeRole role;

    @Column(name = "created_at")
    private LocalDateTime createdAt; // ngày tạo

    @Column(name = "full_name")
    private String fullName; // tên

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private EnumTypeGender gender; // giới tính

    @Column(name = "date_of_birth")
    private LocalDate date_of_birth; // ngaỳ sinh

    @Enumerated(EnumType.STRING)
    private EnumTypeStatus status; // các trạng thái của tài khoản 1 đã kích hoạt 2 chưa verify

    @Column(name="session_id")
    private Integer session_id; // thời gian đăng nhập

    @Column(name="updated_at")
    private LocalDateTime updatedAt; // thời gian cập nhật

    @Column(name = "otp")
    private String otp; // ma otp

    @Column(name = "expired_otp")
    private LocalDateTime expiredOTP; // thời gian otp
}
