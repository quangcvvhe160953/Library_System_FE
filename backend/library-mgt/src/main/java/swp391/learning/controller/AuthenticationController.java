package swp391.learning.controller;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import swp391.learning.application.service.AuthenticationService;
import swp391.learning.domain.dto.common.ResponseCommon;
import swp391.learning.domain.dto.request.user.authentication.CreateUserRequest;
import swp391.learning.domain.dto.response.user.authentication.CreateUserResponseDTO;

@RestController
@RequestMapping("/api/v1/user")
@AllArgsConstructor
@Log4j2
public class AuthenticationController {
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<ResponseCommon<CreateUserResponseDTO>> createUser
            (@Validated @RequestBody CreateUserRequest requestDTO) {
        log.debug("Create user with email", requestDTO.getEmail());
        ResponseCommon<CreateUserResponseDTO> responseDTO = authenticationService.createUser(requestDTO);
        return ResponseEntity.ok(responseDTO);
    }
}
