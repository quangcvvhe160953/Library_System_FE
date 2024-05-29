package swp391.learning.domain.enums;

import lombok.Getter;

@Getter
public enum ResponseCode {
    SUCCESS(200, "Success"),
    FAIL(400, "Fail"),
    USER_NOT_FOUND(404, "User not found"),
    PASSWORD_INCORRECT(401, "Password incorrect"),
    OTP_INCORRECT(1200, "OTP incorrect"),
    Expired_OTP(1300, "Expired OTP"),
    USER_EXIST(1400, "User exist"),
    OLD_PASSWORD_INCORRECT(1500, "Old password incorrect");

    private final int code;
    private final String message;

    ResponseCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}

