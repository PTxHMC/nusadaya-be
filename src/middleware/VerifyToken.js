import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).send({ message: "Akses Tidak Sah" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).send({ message: "Token Kedaluwarsa" });

    req.email = decoded.email;
    req.role = decoded.role;
    req.id = decoded.id;

    next();
  });
};

export default verifyToken;
