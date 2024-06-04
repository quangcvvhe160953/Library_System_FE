package swp391.learning.controller;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import swp391.learning.application.service.AuthenticationService;
import swp391.learning.domain.dto.common.ResponseCommon;
import swp391.learning.domain.dto.request.user.authentication.*;
import swp391.learning.domain.dto.response.user.authentication.*;
import swp391.learning.domain.entity.User;
import swp391.learning.domain.enums.EnumTypeStatus;
import swp391.learning.domain.enums.ResponseCode;
import swp391.learning.repository.AuthenticationRepository;
import swp391.learning.security.SecurityUtils;
import swp391.learning.security.UserDetailsImpl;
import swp391.learning.security.jwt.JWTResponse;
import swp391.learning.security.jwt.JWTUtils;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/user")
@AllArgsConstructor
@Log4j2
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final AuthenticationRepository authenticationRepository;
    private final JWTUtils jwtUtils;

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);


    @PostMapping("/register")
    public ResponseEntity<ResponseCommon<CreateUserResponseDTO>> createUser
            (@Validated @RequestBody CreateUserRequest requestDTO) {
        log.debug("Create user with email", requestDTO.getEmail());
        ResponseCommon<CreateUserResponseDTO> responseDTO = authenticationService.createUser(requestDTO);
        if (responseDTO.getCode() == ResponseCode.SUCCESS.getCode()) {
            return ResponseEntity.ok(responseDTO);
        } else if(responseDTO.getCode() == ResponseCode.USER_EXIST.getCode()){
            return ResponseEntity.badRequest().body(new ResponseCommon<>(ResponseCode.USER_EXIST.getCode(),"Email already register account",null));
        }
        else {
            return ResponseEntity.badRequest().body(new ResponseCommon<>(responseDTO.getCode(),"Resgister fail",null));
        }
    }

    @GetMapping("/get-user-by-email")
    public ResponseEntity<ResponseCommon<GetUserByEmailResponse>> getUserByEmail(GetUserByEmailRequest request) {
        ResponseCommon<GetUserByEmailResponse> response = authenticationService.getUserByEmail(request);
        if (response.getCode() == ResponseCode.SUCCESS.getCode()) {
            logger.debug("Get user by email successfully.");
            return ResponseEntity.ok(response);
        } else if (response.getCode() == ResponseCode.USER_NOT_FOUND.getCode()) {
            logger.debug("User not exist.");
            return ResponseEntity.badRequest().body(new ResponseCommon<>(response.getCode(), "User not exist", null));
        } else {
            logger.error("Get user by email failed");
            return ResponseEntity.badRequest().body(new ResponseCommon<>(ResponseCode.FAIL.getCode(), "Get user by email failed", null));
        }
    }
    @PostMapping("/verify-otp")
    public ResponseEntity<ResponseCommon<VerifyOtpResponse>> verifyOtp(@Valid @RequestBody VerifyOtpRequest verifyOtpRequest) {
        log.debug("Handle verify otp with id {}", verifyOtpRequest.getEmail());
        User user = authenticationRepository.findByEmail(verifyOtpRequest.getEmail()).orElse(null);

        ResponseCommon<VerifyOtpResponse> response = authenticationService.verifyOtp(verifyOtpRequest);
        if (response.getCode()==ResponseCode.Expired_OTP.getCode()) {
            return ResponseEntity.badRequest().body(new ResponseCommon<>(ResponseCode.Expired_OTP.getCode(),"Expried otp",null));
        }
        else  if(response.getCode() == ResponseCode.OTP_INCORRECT.getCode()){

            return ResponseEntity.badRequest().body(new ResponseCommon<>(ResponseCode.OTP_INCORRECT.getCode(),"OTP incorrect",null));

        } else if(response.getCode() == ResponseCode.SUCCESS.getCode()){
            user.setStatus(EnumTypeStatus.ACTIVE.ACTIVE);
            authenticationService.updateUser(user);
            return ResponseEntity.ok(response);
        }
        else {
            return ResponseEntity.badRequest().body(new ResponseCommon<>(response.getCode(),"verify otp fail",null));
        }
    }

    @PostMapping("/getOTP")
    public ResponseEntity<ResponseCommon<GetOTPResponse>> getOTP(@Valid @RequestBody GetOTPRequest request) {
        ResponseCommon<GetOTPResponse> responseDTO = authenticationService.getOtp(request);
        if (responseDTO.getCode() == ResponseCode.SUCCESS.getCode()) {
            return ResponseEntity.ok(responseDTO);
        } else {
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @PostMapping("/resendOTP")
    public ResponseEntity<ResponseCommon<ResendOTPResponse>> resendOTP(@Valid @RequestBody ResendOTPRequest request) {
        ResponseCommon<ResendOTPResponse> responseDTO = authenticationService.resendOTP(request);
        if (responseDTO.getCode() == ResponseCode.SUCCESS.getCode()) {
            return ResponseEntity.ok(responseDTO);
        } else {
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<ResponseCommon<JWTResponse>> login(@RequestBody LoginRequest loginRequest) {
        ResponseCommon<JWTResponse> response = authenticationService.login(loginRequest);
        if (response.getCode() == ResponseCode.SUCCESS.getCode()) {
            return ResponseEntity.ok(response);
        } else if(response.getCode()==ResponseCode.USER_NOT_FOUND.getCode()){
            return ResponseEntity.badRequest().body(new ResponseCommon<>(ResponseCode.USER_NOT_FOUND.getCode(),"Account not register in system",null));
        } else if(response.getCode() ==ResponseCode.PASSWORD_INCORRECT.getCode()){
            return ResponseEntity.badRequest().body(new ResponseCommon<>(ResponseCode.PASSWORD_INCORRECT.getCode(),"Username or password incorrect",null));
        }
        else {
            return ResponseEntity.badRequest().body(new ResponseCommon<>(ResponseCode.FAIL.getCode(),"Login fail",null));
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

    @PostMapping("/refresh-access-token")
    public ResponseEntity<JWTResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();
        User user = authenticationRepository.findByEmail(request.getEmail()).orElse(null);

        if (refreshToken.isEmpty() || refreshToken == null) {
            return ResponseEntity.badRequest().body(null);
        } else {
            UserDetailsImpl userDetails = UserDetailsImpl.build(user);
            String accessToken = jwtUtils.generateAccessToken(userDetails);
            String newRefreshToken = jwtUtils.generateRefreshToken(userDetails);
            JWTResponse response = new JWTResponse();
            response.setAccessToken(accessToken);
            response.setRefreshToken(newRefreshToken);
            return ResponseEntity.ok(response);
        }
    }
}
