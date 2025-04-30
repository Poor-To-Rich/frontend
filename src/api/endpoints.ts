export const endpoints = {
  auth: {
    signup: '/register',
    login: '/user/login',
    logout: '/user/logout',
    deleteUser: '/user/leave',
    checkNicknameDuplicate: '/user/exists/nickname',
    checkUsernameDuplicate: '/user/exists/username',
    refreshToken: '/auth/refresh',
  },
  email: {
    getEmail: '/user/email',
    sendEmail: '/email/send',
    getSendEmailCount: (email: string) => `/email/send?email=${email}`,
    verifyCode: '/email/verify',
    getVerifyEmailCodeCount: (email: string) => `/email/verify?email=${email}`,
    getEmailBlockTime: '/email/block',
  },
};
