import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ScheduleModule } from "@nestjs/schedule";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CitiesModule } from "./cities/cities.module";
import { ListingsModule } from "./listings/listings.module";
import { City, CitySchema } from "./schemas/city.schema";
import { Listing, ListingSchema } from "./schemas/listing.schema";
import { StripeModule } from "./stripe/stripe.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: "nytrek",
      ignoreUndefined: true,
    }),
    MongooseModule.forFeature([
      { name: Listing.name, schema: ListingSchema, collection: "listings" },
      { name: City.name, schema: CitySchema, collection: "cities" },
    ]),
    StripeModule,
    ListingsModule,
    CitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
