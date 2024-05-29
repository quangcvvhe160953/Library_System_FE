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
import swp391.learning.domain.dto.request.user.authentication.*;
import swp391.learning.domain.dto.response.user.authentication.*;
import swp391.learning.domain.entity.User;
import swp391.learning.domain.enums.EnumTypeStatus;
import swp391.learning.domain.enums.ResponseCode;
import swp391.learning.repository.AuthenticationRepository;
import swp391.learning.security.SecurityUtils;
import swp391.learning.security.jwt.JWTResponse;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/user")
@AllArgsConstructor
@Log4j2
public class AuthenticationController {
    private AuthenticationService authenticationService;
    private AuthenticationRepository authenticationRepository;

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

    @PostMapping("/log-out")
    public ResponseEntity<ResponseCommon<LogOutResponse>> logOut(LogOutRequest logOutRequest){
        ResponseCommon<LogOutResponse> response = authenticationService.logOut(logOutRequest);
        if(response.getCode()==ResponseCode.FAIL.getCode()){
            return ResponseEntity.badRequest().body(new ResponseCommon<>(ResponseCode.FAIL.getCode(),"LogOut fail",null));
        } else {
            return ResponseEntity.ok().body(new ResponseCommon<>(ResponseCode.SUCCESS.getCode(),"LogOut success",response.getData()));
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<ResponseCommon<ChangePasswordResponse>> changePassword(@Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        ResponseCommon<ChangePasswordResponse> response = authenticationService.changePassword(changePasswordRequest);
        String username = SecurityUtils.getUsernameAuth();
        System.out.println(username);
        if (response.getCode() == ResponseCode.SUCCESS.getCode()) {
            return ResponseEntity.ok(response);
        }
        else {
            return ResponseEntity.badRequest().body(response);
        }
    }
}
