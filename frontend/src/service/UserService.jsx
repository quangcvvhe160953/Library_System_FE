import axios from "axios";

const ACCOUNT_BASE_URL = "http://localhost:8081/api/v1/auth/";

const login = (account) => {
    return axios.post(ACCOUNT_BASE_URL + 'authenticate', account);
}

const getUserInfoByEmail = (email) => {
    return axios.get(`http://localhost:8081/api/v1/user/by-email/${email}`);
}

const getAllUser = async () => {
    return axios.get(`http://localhost:8081/api/v1/user/customer`);
}

const changePassword = (data) => {
    return axios.post("http://localhost:8081/api/v1/auth/change-password", data)

}

const UserService = {  // Create an object to hold all the functions
    login,
    getUserInfoByEmail,
    getAllUser,
    changePassword
};

export default UserService;  // Export the object as the default