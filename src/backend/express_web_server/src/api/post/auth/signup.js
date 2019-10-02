module.defaults = app => {
  app.post("/auth/signup", (req, res) => {
    const { email, password } = req.body;
    return res.json({ email, password });
  });
};
