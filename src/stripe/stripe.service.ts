import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class StripeService {
  async findOne(email: string) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_PROD, {
      apiVersion: "2023-08-16",
    });
    const search = await stripe.customers.search({
      query: `email:\'${email}\'`,
    });
    if (!search.data.length) return false;
    const subscriptions = await stripe.subscriptions.list({
      customer: search.data[0].id,
      status: "active",
    });
    return !!subscriptions.data.filter((item) => item.status === "active")
      .length;
  }
}
