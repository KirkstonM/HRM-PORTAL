const USER_ROUTES = {
  HOME: '/user/home',
  MY_INFO: '/user/employee',
  PEOPLE: '/user/people',
  FILES: '/user/files',
  CALENDER: '/user/calender',
  CHANGE_PASSWORD: '/user/change-password'
}

const LOGIN_ROUTES = {
  LOGIN: '/',
  SIGNUP: '/signup',
  OTP_VERIFICATION: '/otp-verify',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password'
}

const ADMIN_ROUTES = {
  DASHBOARD: '/admin/dashboard',
  EMPLOYEES: '/admin/employees',
  ATTENDANCES: '/admin/attendances',
  CALENDER: '/admin/calendar',
  LEAVES: '/admin/leaves',
  PAYROLL: '/admin/payroll',
  MY_INFO: '/admin/info',
  CHANGE_PASSWORD: '/admin/change-password',
  SINGLE_EMPLOYEE: '/admin/single-employee/:id'
}

export { USER_ROUTES, LOGIN_ROUTES, ADMIN_ROUTES }
