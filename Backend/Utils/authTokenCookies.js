import jwt from 'jsonwebtoken'

const generateTokenAndCookies = (res, userId) => {
  const accessToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: '1d'
  })
  res.cookie('token', accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 1000
  })
  return accessToken
}

export { generateTokenAndCookies }

//need to recheck this access token and refresh token
//res.cookie is to send a cookie as a reponse and save it on the client
