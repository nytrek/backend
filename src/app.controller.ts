import { Controller, Get, Response } from "@nestjs/common";
import { Response as Res } from "express";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("sitemap.xml")
  async generateSitemap(
    @Response()
    res: Res,
  ) {
    res.set("Content-Type", "text/xml");
    return res.send(await this.appService.generateSitemapIndex());
  }

  @Get("sitemap-main.xml")
  async generateMainSitemap(
    @Response()
    res: Res,
  ) {
    res.set("Content-Type", "text/xml");
    return res.send(await this.appService.generateMainSitemap());
  }

  @Get("sitemap-bostad.xml")
  async generateSitemapBostad(
    @Response()
    res: Res,
  ) {
    res.set("Content-Type", "text/xml");
    return res.send(await this.appService.generateSitemapBostad());
  }

  @Get("sitemap-lagenhet.xml")
  async generateSitemapLagenhet(
    @Response()
    res: Res,
  ) {
    res.set("Content-Type", "text/xml");
    return res.send(await this.appService.generateSitemapLagenhet());
  }

  @Get("sitemap-hus.xml")
  async generateSitemapHus(
    @Response()
    res: Res,
  ) {
    res.set("Content-Type", "text/xml");
    return res.send(await this.appService.generateSitemapHus());
  }

  @Get("sitemap-stuga.xml")
  async generateSitemapStuga(
    @Response()
    res: Res,
  ) {
    res.set("Content-Type", "text/xml");
    return res.send(await this.appService.generateSitemapStuga());
  }

  @Get("sitemap-rum.xml")
  async generateSitemapRum(
    @Response()
    res: Res,
  ) {
    res.set("Content-Type", "text/xml");
    return res.send(await this.appService.generateSitemapRum());
  }

  @Get("sitemap-active.xml")
  async generateSitemapActive(
    @Response()
    res: Res,
  ) {
    res.set("Content-Type", "text/xml");
    return res.send(await this.appService.generateSitemapActive());
  }

  @Get("sitemap-inactive.xml")
  async generateSitemapInactive(
    @Response()
    res: Res,
  ) {
    res.set("Content-Type", "text/xml");
    return res.send(await this.appService.generateSitemapInactive());
  }
}
