import React, { lazy } from 'react'
import { AUTH_ROUTES, LOGIN_ROUTES } from '@Constants/Routes'

const LoginPage = lazy(() => import('@Pages/UserOnboarding/Login'))
const SignupPage = lazy(() => import('@Pages/UserOnboarding/Signup'))
const ResetPassword = lazy(() => import('@Pages/UserOnboarding/ResetPassword'))
const ForgotPassword = lazy(
  () => import('@Pages/UserOnboarding/ForgotPassword')
)

const HomePage = lazy(() => import('@Pages/Home'))
const MyInfoPage = lazy(() => import('@Pages/MyInfo'))
const PeoplePage = lazy(() => import('@Pages/People'))
const FilesPage = lazy(() => import('@Pages/Files'))

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
    Path: LOGIN_ROUTES.FORGOT_PASSWORD,
    Component: ForgotPassword
  },
  {
    Path: LOGIN_ROUTES.RESET_PASSWORD,
    Component: ResetPassword
  }
]

const AUTH_BASE_ROUTES = [
  {
    Path: AUTH_ROUTES.HOME,
    Component: HomePage
  },
  {
    Path: AUTH_ROUTES.MY_INFO,
    Component: MyInfoPage
  },
  {
    Path: AUTH_ROUTES.PEOPLE,
    Component: PeoplePage
  },
  {
    Path: AUTH_ROUTES.FILES,
    Component: FilesPage
  }
]

export { AUTH_BASE_ROUTES, ONBOARDING_ROUTES }
