package swp391.learning.application.service;

import swp391.learning.domain.dto.common.ResponseCommon;
import swp391.learning.domain.dto.request.user.authentication.CreateUserRequest;
import swp391.learning.domain.dto.response.user.authentication.CreateUserResponseDTO;

public interface AuthenticationService {
    ResponseCommon<CreateUserResponseDTO> createUser(CreateUserRequest requestDTO);

    String genUserFromEmail(String email);
}
