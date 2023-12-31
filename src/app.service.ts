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
        <loc>https://frontend.nytrek.dev/</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://frontend.nytrek.dev/hyra-bostad</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://frontend.nytrek.dev/blogg</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://frontend.nytrek.dev/blogg/hyra-lagenhet-i-andrahand</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://frontend.nytrek.dev/blogg/hyra-ut-i-andra-hand</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://frontend.nytrek.dev/blogg/maste-man-ha-hemforsakring</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://frontend.nytrek.dev/integritetspolicy</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://frontend.nytrek.dev/kakor</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://frontend.nytrek.dev/kontakta-oss</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://frontend.nytrek.dev/om-oss</loc>
        <changefreq>weekly</changefreq>
      </url>
      <url>
        <loc>https://frontend.nytrek.dev/villkor</loc>
        <changefreq>weekly</changefreq>
      </url>
    </urlset>
    `;
  }

  async generateSitemapIndex() {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap><loc>https://frontend.nytrek.dev/sitemap-main.xml</loc></sitemap>
    <sitemap><loc>https://frontend.nytrek.dev/sitemap-bostad.xml</loc></sitemap>
    <sitemap><loc>https://frontend.nytrek.dev/sitemap-lagenhet.xml</loc></sitemap>
    <sitemap><loc>https://frontend.nytrek.dev/sitemap-hus.xml</loc></sitemap>
    <sitemap><loc>https://frontend.nytrek.dev/sitemap-stuga.xml</loc></sitemap>
    <sitemap><loc>https://frontend.nytrek.dev/sitemap-rum.xml</loc></sitemap>
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
            <loc>https://frontend.nytrek.dev/hyra-bostad/${item}</loc>
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
        <loc>https://frontend.nytrek.dev/hyra-lagenhet</loc>
        <changefreq>weekly</changefreq>
      </url>
    ${cities.map(
      (item) =>
        `
          <url>
            <loc>https://frontend.nytrek.dev/hyra-lagenhet/${item}</loc>
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
        <loc>https://frontend.nytrek.dev/hyra-hus</loc>
        <changefreq>weekly</changefreq>
      </url>
    ${cities.map(
      (item) =>
        `
          <url>
            <loc>https://frontend.nytrek.dev/hyra-hus/${item}</loc>
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
        <loc>https://frontend.nytrek.dev/hyra-stuga</loc>
        <changefreq>weekly</changefreq>
      </url>
    ${cities.map(
      (item) =>
        `
          <url>
            <loc>https://frontend.nytrek.dev/hyra-stuga/${item}</loc>
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
        <loc>https://frontend.nytrek.dev/hyra-rum</loc>
        <changefreq>weekly</changefreq>
      </url>
    ${cities.map(
      (item) =>
        `
          <url>
            <loc>https://frontend.nytrek.dev/hyra-rum/${item}</loc>
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
            <loc>https://frontend.nytrek.dev/hyra-${item.type_formatted}/${item.city_formatted}/${item.address_formatted}-${item._id}</loc>
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
            <loc>https://frontend.nytrek.dev/hyra-${item.type_formatted}/${item.city_formatted}/${item.address_formatted}-${item._id}</loc>
            <changefreq>weekly</changefreq>
          </url>
        `,
    )}
    </urlset>
    `;
  }
}
