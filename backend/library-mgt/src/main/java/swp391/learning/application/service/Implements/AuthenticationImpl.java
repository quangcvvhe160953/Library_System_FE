package swp391.learning.application.service.Implements;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import swp391.learning.application.service.AuthenticationService;
import swp391.learning.domain.dto.common.ResponseCommon;
import swp391.learning.domain.dto.request.user.authentication.*;
import swp391.learning.domain.dto.response.user.authentication.*;
import swp391.learning.domain.entity.Mail;
import swp391.learning.domain.entity.User;
import swp391.learning.domain.enums.EnumTypeStatus;
import swp391.learning.domain.enums.ResponseCode;
import swp391.learning.repository.AuthenticationRepository;
import swp391.learning.security.SecurityUtils;
import swp391.learning.security.UserDetailsImpl;
import swp391.learning.security.jwt.JWTResponse;
import swp391.learning.security.jwt.JWTUtils;
import swp391.learning.utils.CommonUtils;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticationImpl implements AuthenticationService {
    private final AuthenticationRepository authenticationRepository;
    private final EmailService emailService;
    private final PasswordService servicePassword;

    @Value("${mail.sender}")
    private String sendmail;
    @Value("${otp.valid.minutes}")
    private int otpValid;
    private final Logger log = LoggerFactory.getLogger(AuthenticationImpl.class);

    @Override
    public ResponseCommon<CreateUserResponseDTO> createUser(CreateUserRequest requestDTO) {
        try {
            User user = authenticationRepository.findByEmail(requestDTO.getEmail()).orElse(null);
            // Kiểm tra xem người dùng đã tồn tại và trạng thái là IN_PROCESS hay không
            if (Objects.nonNull(user) && user.getStatus() != EnumTypeStatus.IN_PROCESS) {
                return new ResponseCommon<>(ResponseCode.USER_EXIST, null);
            }
            // Nếu người dùng không tồn tại, tạo mới
            if (Objects.isNull(user)) {
                user = new User();
            }
            // Thiết lập thông tin người dùng
            user.setUsername(getUserFromEmail(requestDTO.getEmail()));
//            String hassPass = servicePassword.hashPassword(requestDTO.getPassword());
            user.setPassword(requestDTO.getPassword());
            user.setEmail(requestDTO.getEmail());
            user.setPhone(requestDTO.getPhone());
            user.setRole(requestDTO.getRole());
            user.setFullName(requestDTO.getFullName());
            user.setGender(requestDTO.getGender());
            user.setDate_of_birth(requestDTO.getDateOfBirth());
            user.setCreatedAt(LocalDateTime.now());
            User createdUser = authenticationRepository.save(user);
            // Tạo phản hồi
            CreateUserResponseDTO responseDTO = new CreateUserResponseDTO();
            responseDTO.setUsername(createdUser.getUsername());
            responseDTO.setEmail(createdUser.getEmail());
            responseDTO.setCreatedAt(createdUser.getCreatedAt());
            return new ResponseCommon<>(ResponseCode.SUCCESS, responseDTO);
        } catch (Exception e) {
            log.error("create user fail", e);
            return new ResponseCommon<>(ResponseCode.FAIL, null);
        }
    }

    @Override
    public String getUserFromEmail(String email) {
        String username = email.substring(0, email.indexOf("@"));
        Random random = new Random();
        StringBuilder randomNumber = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            int digit = random.nextInt(10);
            randomNumber.append(digit);
        }
        String result = username + randomNumber.toString();
        return result;
    }

    @Override
    public ResponseCommon<GetUserByEmailResponse> getUserByEmail(GetUserByEmailRequest getUserByEmailRequest) {
        try {
            User user = authenticationRepository.findByEmail(getUserByEmailRequest.getEmail()).orElse(null);
            // If user in database not exist -> tell user
            if ( Objects.isNull(user) ) {
                log.debug("User not exist");
                return new ResponseCommon<>(ResponseCode.USER_NOT_FOUND.getCode(),"User not exist",null);
            }
            else {
                GetUserByEmailResponse response = new GetUserByEmailResponse();

                response.setId(user.getId());
                response.setUsername(user.getUsername());
                response.setEmail(user.getEmail());
                response.setPhone(user.getPhone());
                response.setRole(user.getRole());
                response.setCreatedAt(user.getCreatedAt());
                response.setFullName(user.getFullName());
                response.setGender(user.getGender());
                response.setDate_of_birth(user.getDate_of_birth());
                response.setStatus(user.getStatus());

                log.debug("Get user by email successfully");
                return new ResponseCommon<>(ResponseCode.SUCCESS.getCode(), "Get user by email success", response);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            log.error("Get user by email failed");
            return new ResponseCommon<>(ResponseCode.FAIL.getCode(),"Get user by email failed",null);
        }
    }

    @Override
    public ResponseCommon<JWTResponse> login(LoginRequest loginRequest) {
        try {
            Optional<User> user = authenticationRepository.findByEmail(loginRequest.getUsername());
            // if username request not found in database -> tell user
            if(user.isEmpty()){
                return new ResponseCommon<>(ResponseCode.USER_NOT_FOUND,null);
            } // else -> check password
            else {
                String hashPass = servicePassword.hashPassword(loginRequest.getPassword());
//                 so sanh pass trong db sai -> return fail
//                String password = loginRequest.getPassword();
//                String hashedPassword = user.get().getPassword();
//                if (!password.equals(hashedPassword)) {
                if (user.orElse(null).getPassword().equals(hashPass)) {
                    return new ResponseCommon<>(ResponseCode.PASSWORD_INCORRECT, null);
                } // else -> verify otp
                else {
                    JWTUtils utils = new JWTUtils();
                    UserDetailsImpl userDetails = UserDetailsImpl.build(user.get());
                    String accessToken = utils.generateAccessToken(userDetails);
                    String refreshToken = utils.generateRefreshToken(userDetails);
                    user.orElse(null).setSession_id(CommonUtils.getSessionID());
                    authenticationRepository.save(user.get());
                    return new ResponseCommon<>(ResponseCode.SUCCESS, new JWTResponse(accessToken, refreshToken, ResponseCode.SUCCESS.getMessage()));
                }
            }
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseCommon<>(ResponseCode.FAIL, null);
        }
    }

    @Override
    public ResponseCommon<ChangePasswordResponse> changePassword(ChangePasswordRequest changePasswordRequest) {
        try {
            String username = SecurityUtils.getUsernameAuth();
            System.out.println(username);
            User user = authenticationRepository.findByUsername(username).orElse(null);
            // if user is null -> tell error
            log.debug("change password with username {}", username);
            if (Objects.isNull(user)) {
                return new ResponseCommon<>(ResponseCode.USER_NOT_FOUND, null);
            } else {
                // if oldPassword not correct -> tell user
                if (!changePasswordRequest.getOldPassword().equals(user.getPassword())) {
                    return new ResponseCommon<>(ResponseCode.PASSWORD_INCORRECT, null);
                } else {
                    user.setPassword(changePasswordRequest.getNewPassword());
                    authenticationRepository.save(user);
                    return new ResponseCommon<>(ResponseCode.SUCCESS, null);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseCommon<>(new ChangePasswordResponse("Error"));
        }
    }

    @Override
    public ResponseCommon<VerifyOtpResponse> verifyOtp(VerifyOtpRequest verifyOtpRequest) {
        try {
            User user = authenticationRepository.findByEmail(verifyOtpRequest.getEmail()).orElse(null);

            if (Objects.isNull(user)) {
                return new ResponseCommon<>(ResponseCode.USER_NOT_FOUND, null);
            }

            LocalDateTime localDateTime = LocalDateTime.now();
            LocalDateTime expiredOTP = user.getExpiredOTP();
            String otp = user.getOtp();

            if (localDateTime.isAfter(expiredOTP)) {
                // Trường hợp OTP đã hết hạn
                return new ResponseCommon<>(ResponseCode.Expired_OTP, null);
            } else if (verifyOtpRequest.getOtp().equals(otp)) {
                // Trường hợp OTP đúng
                return new ResponseCommon<>(ResponseCode.SUCCESS, null);
            } else {
                // Trường hợp OTP sai
                return new ResponseCommon<>(ResponseCode.OTP_INCORRECT, null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseCommon<>(ResponseCode.FAIL, null);
        }
    }

    @Override
    public User updateUser(User user) {
        try {
            Optional<User> existingUser = authenticationRepository.findById(user.getId());
            if (existingUser.isPresent()) {
                User updatedUser = existingUser.get();
                updatedUser.setUsername(user.getUsername());
                updatedUser.setPassword(user.getPassword());
                updatedUser.setEmail(user.getEmail());
                updatedUser.setPhone(user.getPhone());
                updatedUser.setRole(user.getRole());
                updatedUser.setCreatedAt(user.getCreatedAt());
                updatedUser.setFullName(user.getFullName());
                updatedUser.setGender(user.getGender());
                updatedUser.setDate_of_birth(user.getDate_of_birth());
                updatedUser.setUpdatedAt(LocalDateTime.now());
                return authenticationRepository.save(updatedUser);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public ResponseCommon<GetOTPResponse> getOtp(GetOTPRequest request) {
        try {
            User user = authenticationRepository.findByEmailAndStatus(request.getEmail(), EnumTypeStatus.ACTIVE).orElse(null);
            // if  user is null ->throw error
            if (Objects.isNull(user)) {
                return new ResponseCommon<>(ResponseCode.USER_NOT_FOUND, null);
            }
            // step1: gen otp
            // if otp of user expried
            LocalDateTime localDateTime = LocalDateTime.now();
            String otp = CommonUtils.getOTP();
            //step2: send email
            log.info("START... Sending email");
            emailService.sendEmail(setUpMail(user.getEmail(), otp));
            log.info("END... Email sent success");
            if (request.isCreate()) {
                user.setStatus(EnumTypeStatus.IN_PROCESS);
            }
            LocalDateTime expired = localDateTime.plusMinutes(Long.valueOf(otpValid));
            log.debug("Value of expired{}", expired);
            user.setExpiredOTP(expired);
            user.setOtp(otp);
            User createdUser = authenticationRepository.save(user);
            GetOTPResponse response = new GetOTPResponse(user.getUsername(), user.getEmail());
            return new ResponseCommon<>(ResponseCode.SUCCESS, response);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseCommon<>(ResponseCode.FAIL, null);
        }
    }

    @Override
    public ResponseCommon<ResendOTPResponse> resendOTP(ResendOTPRequest request) {
        try {
            User user = authenticationRepository.findByEmail(request.getEmail()).orElse(null);
            LocalDateTime localDateTime = LocalDateTime.now();
            String otp = CommonUtils.getOTP();
            //step2: send email
            log.info("START... Sending email");
            emailService.sendEmail(setUpMail(user.getEmail(),otp));
            log.info("END... Email sent success");
            user.setUsername(getUserFromEmail(request.getEmail()));

            LocalDateTime expired = localDateTime.plusMinutes(Long.valueOf(otpValid));
            log.debug("Value of expired{}",expired);
            user.setExpiredOTP(expired);
            user.setOtp(otp);
            authenticationRepository.save(user);
            return new ResponseCommon<>(ResponseCode.SUCCESS, null);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseCommon<>(ResponseCode.FAIL, null);
        }
    }
    private Mail setUpMail(String mailTo, String otp) {
        Mail mail = new Mail();
        mail.setFrom(sendmail);
        mail.setTo(mailTo);
        mail.setSubject("OTP library");
        Map<String, Object> model = new HashMap<>();
        model.put("otp_value", otp);
        mail.setPros(model);
        mail.setTemplate("templete");
        return mail;
    }
}