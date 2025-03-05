import React, { lazy } from 'react'
import { APP_ROUTES } from '../Constants/Routes/Routes.js'

const LoginPage = lazy(() => import('../Pages/Login/Login.jsx'))
const HomePage = lazy(() => import('../Pages/Home/Home.jsx'))
const MyInfoPage = lazy(() => import('../Pages/MyInfo/MyInfo.jsx'))
const PeoplePage = lazy(() => import('../Pages/People/People.jsx'))
const FilesPage = lazy(() => import('../Pages/Files/Files.jsx'))

export const BASE_ROUTES = [
  {
    Path: APP_ROUTES.LOGIN,
    Component: LoginPage
  },
  {
    Path: APP_ROUTES.HOME,
    Component: HomePage
  },
  {
    Path: APP_ROUTES.MY_INFO,
    Component: MyInfoPage
  },
  {
    Path: APP_ROUTES.PEOPLE,
    Component: PeoplePage
  },
  {
    Path: APP_ROUTES.FILES,
    Component: FilesPage
  }
]

const ADMIN_ROUTES = [
  ...BASE_ROUTES,
  {
    Path: APP_ROUTES.ADMIN,
    Component: ''
  }
]

const LOGIN_ROUTES = {
  Path: APP_ROUTES.LOGIN,
  Component: LoginPage
}
