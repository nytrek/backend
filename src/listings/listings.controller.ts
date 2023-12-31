import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
} from "@nestjs/common";
import { Request } from "express";
import mongoose, { SortOrder } from "mongoose";
import { ListingsService } from "./listings.service";
import { UpdateListingDto } from "./updateListing.dto";

@Controller("listings")
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Get()
  async listings(@Req() req: Request) {
    let sort: { _id?: SortOrder; price?: SortOrder } | undefined;
    switch (req.query.sort) {
      case "latest":
        sort = {
          _id: -1,
        };
        break;
      case "cheapest":
        sort = {
          price: 1,
        };
        break;
      case "costliest":
        sort = {
          price: -1,
        };
        break;
      case "oldest":
        sort = {
          _id: 1,
        };
    }
    const alternatives = (
      req.query.alternatives
        ? JSON.parse(req.query.alternatives as string)
        : undefined
    ) as string[] | undefined;
    const categories = (
      req.query.categories
        ? JSON.parse(req.query.categories as string)
        : undefined
    ) as string[] | undefined;
    const price = req.query.price
      ? JSON.parse(req.query.price as string)
      : ({ gte: undefined, lte: undefined } as {
          gte: number | undefined;
          lte: number | undefined;
        });
    const area = req.query.area
      ? JSON.parse(req.query.area as string)
      : ({ gte: undefined, lte: undefined } as {
          gte: number | undefined;
          lte: number | undefined;
        } as {
          gte: number | undefined;
          lte: number | undefined;
        });
    const room = req.query.room
      ? JSON.parse(req.query.room as string)
      : ({ gte: undefined, lte: undefined } as {
          gte: number | undefined;
          lte: number | undefined;
        } as {
          gte: number | undefined;
          lte: number | undefined;
        });
    return await this.listingsService.listings(
      {
        city_formatted: req.query.city,
        ...(alternatives?.length &&
          Object.assign(
            {},
            ...alternatives?.map((_item: string, index: number) => ({
              [alternatives[index]]: true,
            })),
          )),
        ...(!!categories?.length && { type_formatted: { $in: categories } }),
        price: {
          $gte: price.gte ?? 0,
          $lte: price.lte ?? Infinity,
        },
        area: {
          $gte: area.gte ?? 0,
          $lte: area.lte ?? Infinity,
        },
        room: {
          $gte: room.gte ?? 0,
          $lte: room.lte ?? Infinity,
        },
      },
      sort,
      Number(req.query.page),
    );
  }

  @Get("suggestions/:city")
  async suggestions(@Param("city") city: string) {
    return this.listingsService.suggestions(city);
  }

  @Get("recent")
  async recent() {
    return this.listingsService.recent();
  }

  @Get("likes/:userId")
  async getLikes(@Param("userId") userId: string) {
    return this.listingsService.getLikes(userId);
  }

  @Patch("likes/:id")
  async updateLikes(
    @Param("id") id: string,
    @Body() updateListingDto: UpdateListingDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException("invalid ID");
    return this.listingsService.updateLikes(id, updateListingDto);
  }

  @Get("count")
  async count(@Req() req: Request) {
    const alternatives = (
      req.query.alternatives
        ? JSON.parse(req.query.alternatives as string)
        : undefined
    ) as string[] | undefined;
    const categories = (
      req.query.categories
        ? JSON.parse(req.query.categories as string)
        : undefined
    ) as string[] | undefined;
    const price = req.query.price
      ? JSON.parse(req.query.price as string)
      : ({ gte: undefined, lte: undefined } as {
          gte: number | undefined;
          lte: number | undefined;
        });
    const area = req.query.area
      ? JSON.parse(req.query.area as string)
      : ({ gte: undefined, lte: undefined } as {
          gte: number | undefined;
          lte: number | undefined;
        } as {
          gte: number | undefined;
          lte: number | undefined;
        });
    const room = req.query.room
      ? JSON.parse(req.query.room as string)
      : ({ gte: undefined, lte: undefined } as {
          gte: number | undefined;
          lte: number | undefined;
        } as {
          gte: number | undefined;
          lte: number | undefined;
        });
    const count = await this.listingsService.count({
      city_formatted: req.query.city,
      ...(alternatives?.length &&
        Object.assign(
          {},
          ...alternatives?.map((_item: string, index: number) => ({
            [alternatives[index]]: true,
          })),
        )),
      ...(!!categories?.length && { type_formatted: { $in: categories } }),
      price: {
        $gte: price.gte ?? 0,
        $lte: price.lte ?? Infinity,
      },
      area: {
        $gte: area.gte ?? 0,
        $lte: area.lte ?? Infinity,
      },
      room: {
        $gte: room.gte ?? 0,
        $lte: room.lte ?? Infinity,
      },
    });
    return count[0]?.count ?? 0;
  }

  /**
   * @see https://stackoverflow.com/questions/28720507/setting-an-array-element-as-an-object-property
   * @see https://stackoverflow.com/questions/40848348/spread-an-array-of-objects-into-a-parent-object
   * @see https://stackoverflow.com/questions/11704267/in-javascript-how-to-conditionally-add-a-member-to-an-object
   */
  @Get("coordinates")
  async coordinates(@Req() req: Request) {
    const alternatives = (
      req.query.alternatives
        ? JSON.parse(req.query.alternatives as string)
        : undefined
    ) as string[] | undefined;
    const categories = (
      req.query.categories
        ? JSON.parse(req.query.categories as string)
        : undefined
    ) as string[] | undefined;
    const price = req.query.price
      ? JSON.parse(req.query.price as string)
      : ({ gte: undefined, lte: undefined } as {
          gte: number | undefined;
          lte: number | undefined;
        });
    const area = req.query.area
      ? JSON.parse(req.query.area as string)
      : ({ gte: undefined, lte: undefined } as {
          gte: number | undefined;
          lte: number | undefined;
        } as {
          gte: number | undefined;
          lte: number | undefined;
        });
    const room = req.query.room
      ? JSON.parse(req.query.room as string)
      : ({ gte: undefined, lte: undefined } as {
          gte: number | undefined;
          lte: number | undefined;
        } as {
          gte: number | undefined;
          lte: number | undefined;
        });
    return await this.listingsService.coordinates({
      city_formatted: req.query.city,
      ...(alternatives?.length &&
        Object.assign(
          {},
          ...alternatives?.map((_item: string, index: number) => ({
            [alternatives[index]]: true,
          })),
        )),
      ...(!!categories?.length && { type_formatted: { $in: categories } }),
      price: {
        $gte: price.gte ?? 0,
        $lte: price.lte ?? Infinity,
      },
      area: {
        $gte: area.gte ?? 0,
        $lte: area.lte ?? Infinity,
      },
      room: {
        $gte: room.gte ?? 0,
        $lte: room.lte ?? Infinity,
      },
    });
  }

  /**
   *
   * @param search
   * @see https://stackoverflow.com/questions/65981642/two-endpoints-for-same-controller-route-aliases-in-nestjs
   */
  @Get(["search", "search/:search"])
  async search(@Param("search") search: string, @Req() req: Request) {
    const categories = (
      req.query.categories
        ? JSON.parse(req.query.categories as string)
        : undefined
    ) as string[] | undefined;
    return await this.listingsService.search(search ?? "", {
      ...(!!categories?.length && { type_formatted: { $in: categories } }),
    });
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new BadRequestException("invalid ID");
    return await this.listingsService.findOne(id);
  }
}
