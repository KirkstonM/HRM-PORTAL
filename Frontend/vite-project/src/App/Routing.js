import React, { lazy } from 'react'
import { USER_ROUTES, LOGIN_ROUTES, ADMIN_ROUTES } from '@Constants/Routes'

const LoginPage = lazy(() => import('@Pages/UserOnboarding/Login'))
const SignupPage = lazy(() => import('@Pages/UserOnboarding/Signup'))
const OtpVerificationPage = lazy(
  () => import('@Pages/UserOnboarding/OTPVerify')
)
const ResetPasswordPage = lazy(
  () => import('@Pages/UserOnboarding/ResetPassword')
)
const ForgotPasswordPage = lazy(
  () => import('@Pages/UserOnboarding/ForgotPassword')
)

const HomePage = lazy(() => import('@Pages/Home'))
const MyInfoPage = lazy(() => import('@Pages/MyInfo'))
const PeoplePage = lazy(() => import('@Pages/People'))
const FilesPage = lazy(() => import('@Pages/Files'))
const CalenderPage = lazy(() => import('@Pages/Calender'))
const ChangePasswordPage = lazy(() => import('@Pages/ChangePassword'))

const AdminDashboard = lazy(() => import('@Pages/Admin/Dashboard'))
const LeavesPage = lazy(() => import('@Pages/Admin/Leaves'))
const EmployeesPage = lazy(() => import('@Pages/Admin/Employees'))
const SingleEmployeePage = lazy(
  () => import('@Pages/Admin/Employees/SingleEmployee')
)

const ONBOARDING_ROUTES = [
  {
    Path: LOGIN_ROUTES.LOGIN,
    Component: LoginPage
  },
  {
    Path: LOGIN_ROUTES.SIGNUP,
    Component: SignupPage
  },
  {
    Path: LOGIN_ROUTES.OTP_VERIFICATION,
    Component: OtpVerificationPage
  },
  {
    Path: LOGIN_ROUTES.FORGOT_PASSWORD,
    Component: ForgotPasswordPage
  },
  {
    Path: LOGIN_ROUTES.RESET_PASSWORD,
    Component: ResetPasswordPage
  }
]

const USER_BASE_ROUTES = [
  {
    Path: USER_ROUTES.HOME,
    Component: HomePage
  },
  {
    Path: USER_ROUTES.MY_INFO,
    Component: MyInfoPage
  },
  {
    Path: USER_ROUTES.PEOPLE,
    Component: PeoplePage
  },
  {
    Path: USER_ROUTES.FILES,
    Component: FilesPage
  },
  {
    Path: USER_ROUTES.CALENDER,
    Component: CalenderPage
  },
  {
    Path: USER_ROUTES.CHANGE_PASSWORD,
    Component: ChangePasswordPage
  }
]

const ADMIN_BASE_ROUTES = [
  {
    Path: ADMIN_ROUTES.DASHBOARD,
    Component: AdminDashboard
  },
  {
    Path: ADMIN_ROUTES.LEAVES,
    Component: LeavesPage
  },
  {
    Path: ADMIN_ROUTES.MY_INFO,
    Component: MyInfoPage
  },
  {
    Path: ADMIN_ROUTES.CALENDER,
    Component: CalenderPage
  },
  {
    Path: ADMIN_ROUTES.EMPLOYEES,
    Component: EmployeesPage
  },
  {
    Path: ADMIN_ROUTES.CHANGE_PASSWORD,
    Component: ChangePasswordPage
  },
  {
    Path: ADMIN_ROUTES.SINGLE_EMPLOYEE,
    Component: SingleEmployeePage
  }
]

export { USER_BASE_ROUTES, ONBOARDING_ROUTES, ADMIN_BASE_ROUTES }
