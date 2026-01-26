module.exports = (role) => (req, res, next) => {
  if (req.user.role !== role) throw new Error("Forbidden");
  next();
};
