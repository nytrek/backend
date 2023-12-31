import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, SortOrder } from "mongoose";
import { Listing, ListingDocument } from "src/schemas/listing.schema";
import { UpdateListingDto } from "./updateListing.dto";

const PAGES = 28;

@Injectable()
export class ListingsService {
  @InjectModel(Listing.name)
  private readonly listingModel: Model<ListingDocument>;

  async listings(
    find: FilterQuery<Listing>,
    sort: { [key: string]: SortOrder },
    page: number,
  ) {
    return this.listingModel
      .find({
        ...find,
        active: true,
      })
      .skip((page - 1) * PAGES)
      .limit(PAGES)
      .sort(sort);
  }

  async suggestions(city: string) {
    return this.listingModel.aggregate([
      { $match: { city, active: true } },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                likes: [],
              },
              "$$ROOT",
            ],
          },
        },
      },
      { $sample: { size: 8 } },
    ]);
  }

  async recent() {
    return this.listingModel
      .find({
        active: true,
      })
      .sort({
        _id: -1,
      })
      .limit(8);
  }

  async getLikes(userId: string) {
    return this.listingModel.find({
      likes: userId,
    });
  }

  async updateLikes(id: string, updateListingDto: UpdateListingDto) {
    const listing = await this.listingModel.findById(id).exec();
    if (listing.likes.includes(updateListingDto.userId)) {
      const likes = listing.likes.filter(
        (item) => item !== updateListingDto.userId,
      );
      listing.likes = likes;
      await this.listingModel.findByIdAndUpdate(id, listing);
      return false;
    } else {
      const likes = [...listing.likes, updateListingDto.userId];
      listing.likes = likes;
      await this.listingModel.findByIdAndUpdate(id, listing);
      return true;
    }
  }

  async count(find: FilterQuery<Listing>) {
    return this.listingModel.aggregate([
      {
        $match: {
          ...find,
          active: true,
        },
      },
      {
        $count: "count",
      },
    ]);
  }

  async coordinates(find: FilterQuery<Listing>) {
    return this.listingModel.aggregate([
      {
        $match: {
          ...find,
          active: true,
        },
      },
      {
        $project: {
          _id: 1,
          lat: 1,
          lng: 1,
          price: 1,
        },
      },
    ]);
  }

  /**
   * @see https://stackoverflow.com/questions/35176641/mongo-group-with-project
   * @see https://stackoverflow.com/questions/10610131/checking-if-a-field-contains-a-string
   */
  async search(search: string, find: FilterQuery<Listing>) {
    return this.listingModel.aggregate([
      {
        $match: {
          city: { $regex: search, $options: "i" },
          ...find,
          active: true,
        },
      },
      {
        $group: {
          _id: "$city",
          count: {
            $sum: 1,
          },
          city_formatted: { $first: "$city_formatted" },
        },
      },
      {
        $project: {
          _id: 1,
          count: 1,
          city_formatted: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);
  }

  async findOne(id: string) {
    return this.listingModel.findById(id).exec();
  }
}
