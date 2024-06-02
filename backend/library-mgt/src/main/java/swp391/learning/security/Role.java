package swp391.learning.security;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {

    ADMIN(Code.LIBRARIAN),
    MEMBER(Code.MEMBER);
    private final String authority;

    Role(String authority) {
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return authority;
    }

    public class Code {
        public static final String LIBRARIAN = "ROLE_ADMIN";
        public static final String MEMBER = "ROLE_USER";

    }
}
