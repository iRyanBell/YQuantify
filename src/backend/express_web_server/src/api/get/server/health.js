module.exports = app => {
  app.get("/server/health", (req, res) => {
    return res.sendStatus(200);
  });
};
