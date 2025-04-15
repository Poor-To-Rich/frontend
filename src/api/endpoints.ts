export const API_BASE_URL = '';

export const AUTH = {
  SIGNUP: '/register',
  LOGIN: '/user/login',
  LOGOUT: '/user/logout',
  DELETE_USER: '/user/leave',
  CHECK_NICKNAME_DUPLICATE: '/user/exists/nickname',
  CHECK_USERNAME_DUPLICATE: '/user/exists/username',
};

export const EMAIL = {
  GET_USER_EMAIL: '/user/email',
  EMAIL_SEND: '/email/send',
  CODE_VERIFY: '/email/verify',
  GET_EMAIL_VERIFICATION_BLOCK_TIME: '/email/block',
};
