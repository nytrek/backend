import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { City, CityDocument } from "./schemas/city.schema";
import { Listing, ListingDocument } from "./schemas/listing.schema";

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Listing.name)
    private readonly listingModel: Model<ListingDocument>,
    @InjectModel(City.name)
    private readonly cityModel: Model<CityDocument>,
  ) {}

  getHello(): string {
    return "Hello World!";
  }

  async generateMainSitemap() {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.bostadsval.se/</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://www.bostadsval.se/hyra-bostad</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://www.bostadsval.se/blogg</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://www.bostadsval.se/blogg/hyra-lagenhet-i-andrahand</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://www.bostadsval.se/blogg/hyra-ut-i-andra-hand</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://www.bostadsval.se/blogg/maste-man-ha-hemforsakring</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://www.bostadsval.se/integritetspolicy</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://www.bostadsval.se/kakor</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://www.bostadsval.se/kontakta-oss</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://www.bostadsval.se/om-oss</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://www.bostadsval.se/villkor</loc>
        <changefreq>weekly</changefreq>
      </url>
    </urlset>
    `;
  }

  async generateSitemapIndex() {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap><loc>https://www.bostadsval.se/sitemap-main.xml</loc></sitemap>
    <sitemap><loc>https://www.bostadsval.se/sitemap-bostad.xml</loc></sitemap>
    <sitemap><loc>https://www.bostadsval.se/sitemap-lagenhet.xml</loc></sitemap>
    <sitemap><loc>https://www.bostadsval.se/sitemap-hus.xml</loc></sitemap>
    <sitemap><loc>https://www.bostadsval.se/sitemap-stuga.xml</loc></sitemap>
    <sitemap><loc>https://www.bostadsval.se/sitemap-rum.xml</loc></sitemap>
    </sitemapindex>
    `;
  }

  /**
   * @see https://stackoverflow.com/questions/11470614/mongodb-return-all-documents-by-field-without-duplicates
   */
  async generateSitemapBostad() {
    const cities = await this.cityModel
      .find()
      .sort({ city_formatted: 1 })
      .distinct("city_formatted");
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${cities.map(
      (item) =>
        `
          <url>
            <loc>https://www.bostadsval.se/hyra-bostad/${item}</loc>
            <changefreq>weekly</changefreq>
          </url>
        `,
    )}
    </urlset>
    `;
  }

  /**
   * @see https://stackoverflow.com/questions/11470614/mongodb-return-all-documents-by-field-without-duplicates
   */
  async generateSitemapLagenhet() {
    const cities = await this.cityModel
      .find({ type_formatted: "lagenhet" })
      .distinct("city_formatted");
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.bostadsval.se/hyra-lagenhet</loc>
        <changefreq>weekly</changefreq>
      </url>
    ${cities.map(
      (item) =>
        `
          <url>
            <loc>https://www.bostadsval.se/hyra-lagenhet/${item}</loc>
            <changefreq>weekly</changefreq>
          </url>
        `,
    )}
    </urlset>
    `;
  }

  /**
   * @see https://stackoverflow.com/questions/11470614/mongodb-return-all-documents-by-field-without-duplicates
   */
  async generateSitemapHus() {
    const cities = await this.cityModel
      .find({ type_formatted: "hus" })
      .distinct("city_formatted");
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.bostadsval.se/hyra-hus</loc>
        <changefreq>weekly</changefreq>
      </url>
    ${cities.map(
      (item) =>
        `
          <url>
            <loc>https://www.bostadsval.se/hyra-hus/${item}</loc>
            <changefreq>weekly</changefreq>
          </url>
        `,
    )}
    </urlset>
    `;
  }

  /**
   * @see https://stackoverflow.com/questions/11470614/mongodb-return-all-documents-by-field-without-duplicates
   */
  async generateSitemapStuga() {
    const cities = await this.cityModel
      .find({ type_formatted: "stuga" })
      .distinct("city_formatted");
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.bostadsval.se/hyra-stuga</loc>
        <changefreq>weekly</changefreq>
      </url>
    ${cities.map(
      (item) =>
        `
          <url>
            <loc>https://www.bostadsval.se/hyra-stuga/${item}</loc>
            <changefreq>weekly</changefreq>
          </url>
        `,
    )}
    </urlset>
    `;
  }

  /**
   * @see https://stackoverflow.com/questions/11470614/mongodb-return-all-documents-by-field-without-duplicates
   */
  async generateSitemapRum() {
    const cities = await this.cityModel
      .find({ type_formatted: "rum" })
      .distinct("city_formatted");
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.bostadsval.se/hyra-rum</loc>
        <changefreq>weekly</changefreq>
      </url>
    ${cities.map(
      (item) =>
        `
          <url>
            <loc>https://www.bostadsval.se/hyra-rum/${item}</loc>
            <changefreq>weekly</changefreq>
          </url>
        `,
    )}
    </urlset>
    `;
  }

  async generateSitemapActive() {
    const cities = await this.listingModel.aggregate([
      {
        $match: {
          active: true,
        },
      },
      {
        $project: {
          _id: 1,
          city_formatted: 1,
          type_formatted: 1,
          address_formatted: 1,
        },
      },
    ]);
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${cities.map(
      (item) =>
        `
          <url>
            <loc>https://www.bostadsval.se/hyra-${item.type_formatted}/${item.city_formatted}/${item.address_formatted}-${item._id}</loc>
            <changefreq>weekly</changefreq>
          </url>
        `,
    )}
    </urlset>
    `;
  }

  async generateSitemapInactive() {
    const cities = await this.listingModel.aggregate([
      {
        $match: {
          active: false,
        },
      },
      {
        $project: {
          _id: 1,
          city_formatted: 1,
          type_formatted: 1,
          address_formatted: 1,
        },
      },
    ]);
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${cities.map(
      (item) =>
        `
          <url>
            <loc>https://www.bostadsval.se/hyra-${item.type_formatted}/${item.city_formatted}/${item.address_formatted}-${item._id}</loc>
            <changefreq>weekly</changefreq>
          </url>
        `,
    )}
    </urlset>
    `;
  }
}
