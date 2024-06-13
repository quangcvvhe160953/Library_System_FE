import axiosClient from './axiosClient';

const authApi = {
  register: (params) => {
    const url = '/api/v1/user/register';
    return axiosClient
      .post(url, params)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  },
  login: (params) => {
    const url = '/api/v1/user/login';
    return axiosClient
      .post(url, params)
      .then((response) => {
        if (response.data.code === 200) {
          // Lưu access_token vào Local Storage
          localStorage.setItem('access_token', response?.data?.accessToken);
        }
        // Trả về dữ liệu phản hồi cho phần gọi API
        return response;
      })
      .catch((error) => {
        return error.response.data;
      });
  },
  verifyOTP: (otp) => {
    const url = '/api/v1/user/verify-otp';

    return axiosClient.post(url, otp);
  },
  getOTP: (email) => {
    const url = '/api/v1/user/getOTP';
    return axiosClient.post(url, email);
  },
  resendOTP: (email) => {
    const url = '/api/v1/user/resendOTP';
    return axiosClient.post(url, email);
  },
  verifyOTPForgotPassword: (otp) => {
    const url = '/api/v1/user/verify-otp-forgotPass';

    return axiosClient.post(url, otp);
  },
  sendOTPForgotPassword: (params) => {
    const url = '/api/v1/user/send-otp-forgot-password';

    return axiosClient
      .post(url, params)
      .then((response) => {
        console.log(response);
        // Handle the response data as needed
        return response;
      })
      .catch((error) => {
        // Handle errors and throw or provide error information as needed
        return error.response.data;
      });
  },
  changePassword: (params) => {
    const url = '/api/v1/user/changePassword';

    const accessToken = localStorage.getItem('user-access-token');

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return axiosClient
      .post(url, params, { headers })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response.data;
      });
  },
  changeProfile: (params) => {
    const url = '/api/v1/user/change-profile';
    return axiosClient.put(url, params);
  },
  getUserByEmail: (params) => {
    const url = '/api/vi/user/get-user-by-email';
    return axiosClient.get(url, params);
  },
  getUserByUserName: (username) => {
    const url = `/api/v1/user/get-user-by-username?username=${username}`;
    return axiosClient.get(url);
  },
  // confirmPayment: (params) => {
  //   const url = '/api/v1/course/confirm-payment';
  //   return axiosClient.post(url, params);
  // },

  // checkEnroll: (params) => {
  //   const url = `/api/v1/course/check-enroll?courseId=${params.courseId}&username=${params.username}`;
  //   return axiosClient.get(url, params);
  // },

  totalUser: (params) => {
    const url = '/api/v1/user/total-user';
    return axiosClient.get(url, params);
  },
  // findAllDeleted: (str) => {
  //   const url = `/api/v1/${str}/find-all-${str}-by-deleted?deleted=${true}`;
  //   return axiosClient.get(url);
  // },
  // restoreEntity: (params, str) => {
  //   const url = `/api/v1/${str}/update-${str}`;
  //   if (str === 'category' || str === 'course') return axiosClient.post(url, params);
  //   else return axiosClient.get(url, params);
  // },
  getAllUser: () => {
    const url = '/api/v1/user/get-all-user';
    return axiosClient.get(url);
  },
  changeRoleUser: (params) => {
    const url = '/api/v1/user/set-role-user';
    return axiosClient.post(url, params);
  },
  // eslint-disable-next-line no-dupe-keys
  getUserByEmail: (email) => {
    const url = `/api/v1/user/get-user-by-email?email=${email}`;
    return axiosClient.get(url, email);
  },
  // getAllPayment: () => {
  //   const url = '/api/v1/payment/get-all-payment';
  //   return axiosClient.get(url);
  // },
  getPaymentUser: (username) => {
    const url = `/api/v1/payment/get-payment-user?username=${username}`;
    return axiosClient.get(url, username);
  },
};

export default authApi;
