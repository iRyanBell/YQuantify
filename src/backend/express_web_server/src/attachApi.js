const attachApiGetServerHealth = require("./post/payment");
const attachApiPostPayment = require("./post/payment");

module.defaults = app => {
  /* Check server health (Called by Render.com) /*
	/* Returns 200. */
  attachApiGetServerHealth(app);

  /* Payment receipt notification (Called by Stripe.com) */
  /* Receives payment & subscription details. */
  /* Returns { received: true } or 400 error. */
  attachApiPostPayment(app);
};
