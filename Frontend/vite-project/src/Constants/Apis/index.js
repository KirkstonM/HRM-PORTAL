export const API_ENDPOINTS = {
  AUTH: '/check-auth',
  SIGNUP: '/signup',
  OTP_VERIFICATION: '/otp-verification',
  LOGOUT: '/logout',
  LOCALE: '/locale'
}
/************* ONBOARDING API ENDPOINTS *****************/

export const ONBOARDING_ENDPOINTS = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password?token=',
  LOGOUT: '/logout'
}

/************* USER API ENDPOINTS *****************/

export const USER_ENDPOINTS = {
  UPDATE_USER_DETAILS: '/user/update-user',
  CHANGE_PASSWORD: '/user/change-password',
  APPLY_LEAVE: '/user/leave/apply',
  LEAVE_REQUESTS: '/user/leave/my-requests',
  ORG_TREE: '/org-tree',
  CALENDAR: '/calendar-leaves',
  UPLOAD_IMAGE: '/upload-profile-pic',
  BIRTHDAYS: '/birthdays'
}

/************* ADMIN API ENDPOINTS *****************/

export const ADMIN_ENDPOINTS = {
  CREATE_USER: '/admin/create-user',
  DELETE_USER: `/admin/delete-user/`,
  GET_ALL_USERS: '/admin/get-all-users',
  GET_EMPLOYEE: '/admin/get-user/:id',
  GET_ALL_LEAVES: '/admin/get-all-leaves',
  APPROVE_LEAVES: '/admin/approve-leaves',
  ADD_LEAVES: '/admin/add-leaves',
  UPDATE_USER: '/admin/update-user/',
  LEAVE_PIE_CHART: '/admin/pie-chart-leave-data',
  LEAVE_BAR_CHART: '/admin/bar-chart-leave-data',
  EMPLOYEE_DATA: '/admin/emp-chart-data'
}
