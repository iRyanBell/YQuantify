const stripe = require("stripe")(process.env.STRIPE_SECRET);
const moment = require("moment");

module.exports = (app, pgPool) => {
  app.post("/stripe/webhook", async (req, res) => {
    let event;

    try {
      /* Validate event & parse JSON data from Stripe.com.  */
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers["stripe-signature"],
        process.env.STRIPE_SIGNING_SECRET
      );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    }

    /* Stripe webhooks. */
    switch (event.type) {
      case "invoice.payment_succeeded": {
        /* We received a payment! */
        /* Reference: https://stripe.com/docs/billing/lifecycle */

        const {
          customer,
          hosted_invoice_url,
          amount_remaining
        } = event.data.object;
        if (amount_remaining === 0) {
          await Promise.all([
            pgPool.query({
              text: `
								UPDATE users
								SET last_payment_at=CURRENT_TIMESTAMP
								WHERE stripe_customer_id=$1
							`,
              values: [customer]
            }),
            pgPool.query({
              text: `
								INSERT INTO stripe_invoices (uid, url)
								VALUES (
									(SELECT uid FROM users WHERE stripe_customer_id = $1),
									$2
								)
							`,
              values: [customer, hosted_invoice_url]
            })
          ]);
        }
        return res.json({ received: true });
      }
      case "invoice.payment_failed": {
        /* Payment failed (bad card). */
        /* Reference: https://stripe.com/docs/billing/migration/invoice-states */

        const { customer } = event.data.object;

        await pgPool.query({
          text: `
						UPDATE users
						SET has_error_payment=TRUE
						WHERE stripe_customer_id=$1
					`,
          values: [customer]
        });

        return res.json({ received: true });
      }
      case "checkout.session.completed": {
        /* We have a new customer. */
        /* Reference: https://stripe.com/docs/payments/checkout/fulfillment */

        const {
          customer,
          subscription,
          client_reference_id
        } = event.data.object;

        await pgPool.query({
          text: `
						UPDATE users
						SET stripe_customer_id=$1,
								stripe_subscription_id=$2
						WHERE id=$3
					`,
          values: [customer, subscription, client_reference_id]
        });

        return res.json({ received: true });
      }
      case "customer.subscription.updated": {
        /* The subscription status has updated (update next payment date). */
        /* Reference: https://stripe.com/docs/payments/checkout/fulfillment */

        const { current_period_end, customer } = event.data.object;
        const nextPaymentDue = moment(current_period_end * 1000).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        await pgPool.query({
          text: `
						UPDATE users
						SET next_payment_due_at=$1
						WHERE stripe_customer_id=$2
					`,
          values: [nextPaymentDue, customer]
        });

        return res.json({ received: true });
      }
      default: {
        return res.status(400).end();
      }
    }
  });
};
