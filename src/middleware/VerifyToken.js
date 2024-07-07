import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.send({ message: "Akses Tidak Sah" }).status(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.send({ message: "Token Kedaluwarsa" }).status(403);

    req.email = decoded.email;
    req.role = decoded.role;
    req.id = decoded.id

    next();
  });
};

export default verifyToken;
