import jwt from 'jsonwebtoken'

const generateTokenAndCookies = (res, empId) => {
  const accessToken = jwt.sign({ empId }, process.env.SECRET_KEY, {
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
