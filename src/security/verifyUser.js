"use strict"

const jwt = require("jsonwebtoken")

const validateUserIdToken = async (req, res, next) => {
<<<<<<< HEAD
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    req.user = jwt.verify(token, process.env.TOKEN_KEY);
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

module.exports = {
  validateFirebaseIdToken: validateUserIdToken
};
=======
  const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"]
  console.log(token)

  if (!token) {
    return res.status(403).send("A token is required for authentication")
  }
  try {
    req.user = jwt.verify(token.split(" ")[1], process.env.TOKEN_KEY)
  } catch (err) {
    return res.status(401).send("Invalid Token")
  }
  return next()
}

module.exports = {
  validateFirebaseIdToken: validateUserIdToken,
}
>>>>>>> c0f52688754ca937a0c1ce6aa41f7791fa7f360f
