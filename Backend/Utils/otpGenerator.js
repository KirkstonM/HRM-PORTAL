const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

const OTPExpiration = Date.now() + 24 * 60 * 60 * 1000

export { generateOTP, OTPExpiration }
