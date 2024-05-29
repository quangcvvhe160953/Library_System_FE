package swp391.learning.application.service;

import swp391.learning.domain.dto.common.ResponseCommon;
import swp391.learning.domain.dto.request.user.authentication.*;
import swp391.learning.domain.dto.response.user.authentication.*;
import swp391.learning.domain.entity.User;
import swp391.learning.security.jwt.JWTResponse;

public interface AuthenticationService {
    ResponseCommon<CreateUserResponseDTO> createUser(CreateUserRequest requestDTO);

    String genUserFromEmail(String email);

    ResponseCommon<JWTResponse> login(LoginRequest loginRequest);

    ResponseCommon<LogOutResponse> logOut(LogOutRequest logOutRequest);

    ResponseCommon<ChangePasswordResponse> changePassword(ChangePasswordRequest changePasswordRequest);

    ResponseCommon<VerifyOtpResponse> verifyOtp(VerifyOtpRequest verifyOtpRequest);

    User updateUser(User user);

    ResponseCommon<GetOTPResponse> getOtp(GetOTPRequest request);

    ResponseCommon<ResendOTPResponse> resendOTP(ResendOTPRequest request);

}
