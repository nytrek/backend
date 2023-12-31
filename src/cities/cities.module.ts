import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { City, CitySchema } from "src/schemas/city.schema";
import { Listing, ListingSchema } from "src/schemas/listing.schema";
import { CitiesController } from "./cities.controller";
import { CitiesService } from "./cities.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Listing.name, schema: ListingSchema, collection: "listings" },
      { name: City.name, schema: CitySchema, collection: "cities" },
    ]),
  ],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
