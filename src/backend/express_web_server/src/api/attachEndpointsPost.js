const attachPostAuth = require("./post/attachPostAuth");
const attachPostStripe = require("./post/attachPostStripe");

module.exports = app => {
  attachPostAuth(app);
  attachPostStripe(app);
};
