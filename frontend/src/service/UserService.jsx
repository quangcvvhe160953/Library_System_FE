import axiosClient from "../config/AxiosConfig";


const login = (account) => {
    return axiosClient.post("/api/v1/auth/login" , account);
}

const getUserInfoByEmail = (email) => {
    return axiosClient.get(`/api/v1/user/by-email/${email}`);
}

const getAllUser = async () => {
    return axiosClient.get(`/api/v1/user/customer`);
}

const changePassword = (data) => {
    return axiosClient.post("/api/v1/auth/change-password", data)

}
const UserService = {  
    login,
    getUserInfoByEmail,
    getAllUser,
    changePassword
};

export default UserService;  