module.exports = (req, res) => {
  res.status(404).json({ msg: "Route Not Found" });
};
