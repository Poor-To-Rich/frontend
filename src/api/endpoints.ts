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
    verifyCode: '/email/verify',
  },
  total: {
    getMonthlyTotal: (date: string) => `/report/monthly/total?date=${date}`,
  },
  transaction: {
    getDailyDetails: (date: string) => `/report/daily/details?date=${date}`,
    addExpense: '/expense',
    getExpense: (id: string) => `/expense/${id}`,
    updateExpense: (id: string) => `/expense/${id}`,
    deleteExpense: (id: string) => `/expense/${id}`,
    addIncome: '/income',
    getIncome: (id: string) => `/income/${id}`,
    updateIncome: (id: string) => `/income/${id}`,
    deleteIncome: (id: string) => `/income/${id}`,
  },
};
