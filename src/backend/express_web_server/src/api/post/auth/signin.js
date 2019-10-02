module.defaults = app => {
  app.post("/auth/signin", (req, res) => {
    return res.sendStatus(200);
  });
};
