import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { City, CityDocument } from "src/schemas/city.schema";
import { Listing, ListingDocument } from "src/schemas/listing.schema";

@Injectable()
export class CitiesService {
  @InjectModel(Listing.name)
  private readonly listingModel: Model<ListingDocument>;
  @InjectModel(City.name)
  private readonly cityModel: Model<CityDocument>;

  async count() {
    return this.listingModel.aggregate([
      {
        $match: {
          active: true,
        },
      },
      {
        $group: {
          _id: "$city",
          city_formatted: { $first: "$city_formatted" },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 24
      }
    ]);
  }

  async seo(find: FilterQuery<City>) {
    return this.cityModel.aggregate([
      {
        $match: find,
      },
      {
        $project: {
          _id: null,
          city: 1,
          type_formatted: 1,
          seo: 1,
        },
      },
    ]);
  }

  async average(find: FilterQuery<Listing>) {
    return this.listingModel.aggregate([
      {
        $match: find,
      },
      {
        $group: {
          _id: null,
          avg_price: { $avg: "$price" },
        },
      },
      {
        $project: {
          _id: 1,
          avg_price: { $ceil: "$avg_price" },
        },
      },
    ]);
  }

  async city(find: FilterQuery<Listing>) {
    return this.listingModel.aggregate([
      {
        $match: {
          ...find,
          active: true,
        },
      },
      {
        $group: {
          _id: null,
          count: { $count: {} },
          city: { $first: "$city" },
          avg_price: { $avg: "$price" },
        },
      },
      {
        $project: {
          _id: 1,
          count: 1,
          city: 1,
          avg_price: { $ceil: "$avg_price" },
        },
      },
    ]);
  }
}
