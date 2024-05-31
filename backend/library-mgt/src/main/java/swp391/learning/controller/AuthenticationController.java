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
import swp391.learning.domain.dto.request.user.authentication.ChangePasswordRequest;
import swp391.learning.domain.dto.request.user.authentication.CreateUserRequest;
import swp391.learning.domain.dto.request.user.authentication.LoginRequest;
import swp391.learning.domain.dto.response.user.authentication.ChangePasswordResponse;
import swp391.learning.domain.dto.response.user.authentication.CreateUserResponseDTO;
import swp391.learning.domain.enums.ResponseCode;
import swp391.learning.security.SecurityUtils;
import swp391.learning.security.jwt.JWTResponse;

import javax.validation.Valid;

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

    @PostMapping("/login")
    public ResponseEntity<ResponseCommon<JWTResponse>> login(@RequestBody LoginRequest loginRequest) {
        ResponseCommon<JWTResponse> response = authenticationService.login(loginRequest);
        if (response.getCode() == ResponseCode.SUCCESS.getCode()) {
            return ResponseEntity.ok(response);
        } else if (response.getCode() == ResponseCode.USER_NOT_FOUND.getCode()) {
            return ResponseEntity.badRequest().body(new ResponseCommon<>(ResponseCode.USER_NOT_FOUND.getCode(), "Account not register in system", null));
        } else if (response.getCode() == ResponseCode.PASSWORD_INCORRECT.getCode()) {
            return ResponseEntity.badRequest().body(new ResponseCommon<>(ResponseCode.PASSWORD_INCORRECT.getCode(), "Username or password incorrect", null));
        } else {
            return ResponseEntity.badRequest().body(new ResponseCommon<>(ResponseCode.FAIL.getCode(), "Login fail", null));
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<ResponseCommon<ChangePasswordResponse>> changePassword(@Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        ResponseCommon<ChangePasswordResponse> response = authenticationService.changePassword(changePasswordRequest);
        String username = SecurityUtils.getUsernameAuth();
        System.out.println(username);
        if (response.getCode() == ResponseCode.SUCCESS.getCode()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
}
