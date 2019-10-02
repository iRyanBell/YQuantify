module.exports = app => {
  app.post("/auth/signin", (req, res) => {
    const { email, password } = req.body;
    return res.json({ email, password });
  });
};
