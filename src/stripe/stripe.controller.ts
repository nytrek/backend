import { Controller, Get, Param } from "@nestjs/common";
import { StripeService } from "./stripe.service";

@Controller("stripe")
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get(":email")
  async findOne(@Param("email") email: string) {
    return this.stripeService.findOne(email);
  }
}
