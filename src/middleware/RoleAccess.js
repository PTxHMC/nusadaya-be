const roleAccess = (roles) => {
  return (req, res, next) => {
    const role = req.role;

    if (!roles.includes(role)) {
      return res.json({ message: "akses ditolak" }).status(403);
    }

    next();
  };
};

export default roleAccess;
