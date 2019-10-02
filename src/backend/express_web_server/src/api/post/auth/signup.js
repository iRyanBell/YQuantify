module.defaults = app => {
  app.post("/auth/signup", (req, res) => {
    return res.sendStatus(200);
  });
};
