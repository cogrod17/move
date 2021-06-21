const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const TOP_SECRET = require("../models/topSecret");

const auth = async (req, res, next) => {
  console.log(req);
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, TOP_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error();

    //attach token and user to the request for authentication
    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
