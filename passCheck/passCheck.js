const passKeys = ["4dRqJINwfV5AB9Sj", "hbxqKRH9Aro5BslY", "W0tXYKngstLLu86f"];

function passCheck(req, res, next) {
  const passKey = req.headers["passkey"];

  if (passKey && passKeys.includes(passKey)) {
    next();
  } else {
    res.status(403).json("Access denied, please Enter Your Password");
  }
}

module.exports = passCheck;