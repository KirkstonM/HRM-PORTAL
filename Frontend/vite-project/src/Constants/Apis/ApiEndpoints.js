const BASE_URL = process.env.REACT_APP_BASE_URL

export const API_ENDPOINTS = {
  AUTH: `${BASE_URL}/auth`,
  SIGNUP: `${BASE_URL}/signup`,
  OTP_VERIFICATION: `${BASE_URL}/otp-verification`,
  LOGOUT: `${BASE_URL}/logout`,
  LOGIN: `${BASE_URL}/login`,
  FORGOT_PASSWORD: `${BASE_URL}/forgot-password`,
  RESET_PASSWORD: `${BASE_URL}/reset-password`,
  LOCALE: `${BASE_URL}/locale`
}
