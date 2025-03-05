import jwt from 'jsonwebtoken'

const checkAuthentication = async (req, res, next) => {
  const authToken = req.cookies.token //.token -- this has to be the name of the cookie we set when we sent the response in authTokenCookies
  if (!authToken) return res.status(401).json({ msg: 'Unauthorized Token' })
  try {
    console.log('Token received:', authToken)
    const decodeCookie = jwt.verify(authToken, process.env.SECRET_KEY)
    console.log('Decoded Token:', decodeCookie)
    if (!decodeCookie) {
      return res.status(401).json({ msg: 'Expired token' })
    }
    req.empId = decodeCookie.empId
    next()
  } catch (error) {
    return res.status(401).json({ msg: 'Unauthorized' })
  }
}
export { checkAuthentication }

/*
 * @@EXPLANATION:
 *  When a user logs in or signs up, we generate a JWT token that contains the user's ID inside it.
 *  This userId helps us identify which user is making a request.
 *  This creates a JWT token that holds the user's ID.
    The token will be stored in cookies or sent in the Authorization header.
 *  When a user makes a request, we verify the token and extract userId:
 *
 * Middleware -> Middleware is a function that runs before the actual request handler in Express.js.
 *  It can: ✔ Modify the request or response objects
 * */
