import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader?.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
    if (error) return res.sendStatus(403);
    req.email = decoded.email;
    next();
  });
};

export default verifyToken;
