import jwt from "jsonwebtoken"

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "")

  if (token) {
    try {
      const decode = jwt.verify(token, "secret")

      req.userId = decode._id

      next()
    } catch (error) {
      return res.status(403).json({
        message: "No access",
      })
    }
  } else {
    return res.status(403).json({
      message: "No access",
    })
  }
}
