async function getMe(req, res) {
  const user = req.user;
  res.json({
    id: user._id,
    firebaseUid: user.firebaseUid,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  });
}

module.exports = { getMe };
