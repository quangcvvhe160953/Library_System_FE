package swp391.learning.repository;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Repository;
import swp391.learning.domain.dto.common.ResponseCommon;
import swp391.learning.domain.dto.request.user.authentication.ChangePasswordRequest;
import swp391.learning.domain.dto.response.user.authentication.ChangePasswordResponse;
import swp391.learning.domain.entity.User;
import swp391.learning.domain.enums.EnumTypeStatus;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
@Repository
public interface AuthenticationRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    Optional<User> findUserById(int id);

    Optional<User> findByUsernameAndStatus(String username, EnumTypeStatus status);

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndStatus(String email,EnumTypeStatus status);

    @Query(value = "SELECT COUNT(*) FROM users WHERE deleted = false", nativeQuery = true)
    int getTotalUser();

}
