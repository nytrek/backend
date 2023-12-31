import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Listing, ListingSchema } from "src/schemas/listing.schema";
import { ListingsController } from "./listings.controller";
import { ListingsService } from "./listings.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Listing.name, schema: ListingSchema, collection: "listings" },
    ]),
  ],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
