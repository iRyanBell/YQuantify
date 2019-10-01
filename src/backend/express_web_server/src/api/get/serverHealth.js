module.defaults = app => {
  app.get("/server/health-check", (req, res) => {
    return res.sendStatus(200);
  });
};
