import prisma from "../db/index.js";
import jwt from "jsonwebtoken";

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return res.status(401).send({ message: "Akses Tidak Sah" });

    const user = await prisma.user.findMany({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user[0]) return res.status(403).send({ message: "Token Kedaluwarsa" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
      if (err) return res.status(403).send({ message: "Token Kedaluwarsa" });
      const { id, username, email, role } = user[0];

      const accessToken = jwt.sign(
        { id, username, email, role },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15s",
        }
      );

      res.json({
        message: "Refresh Token Berhasil",
        data: {
          access_token: accessToken,
        },
      });
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export { refreshToken };
