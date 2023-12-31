import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import {
  Available,
  Plural,
  Pronoun,
  Property,
  Singular,
  Specific,
} from "src/utils/helpers";
import { typeZodSchema } from "../schemas/type.schema";
import { meta } from "../utils/storage";
import { CitiesService } from "./cities.service";

@Controller("cities")
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get("count")
  async count() {
    return await this.citiesService.count();
  }

  @Get(":type_formatted/:city_formatted")
  async findCity(
    @Param("type_formatted") type_formatted: string,
    @Param("city_formatted") city_formatted: string,
  ) {
    /**
     * @description get total average of all cities
     */
    const total = (await this.citiesService.average({}))[0];
    const city = (
      await this.citiesService.city(
        type_formatted === "bostad"
          ? { city_formatted }
          : { type_formatted, city_formatted },
      )
    )[0];
    /**
     * @description check if type_formatted is of a supported type
     */
    if (!typeZodSchema.safeParse(type_formatted).success)
      throw new BadRequestException();
    /**
     * @description check if previous services are not undefined
     */ else if (city && total) {
      /**
       * @description format city name
       */
      const name = city.city[0].toUpperCase() + city.city.slice(1);
      /**
       * @description generate faq
       */
      const faqs = [
        {
          question: `Hur många lediga ${Plural[type_formatted]} finns det i ${name} just nu?`,
          answer: `Just nu finns det ${city.count} lediga ${Plural[type_formatted]} att hyra i ${name}.`,
        },
        {
          question: `Hur mycket kostar det att hyra ${Property[type_formatted]} i ${name}?`,
          answer: `Det kostar i genomsnitt ${city.avg_price} kr att hyra ${
            Property[type_formatted]
          } i ${name}. Det är ${
            city.avg_price < total.avg_price ? "billigare" : "dyrare"
          } jämfört med snittet i Sverige som är ${total.avg_price} kr.`,
        },
        {
          question: `Hur hittar jag snabbast ${Property[type_formatted]} att hyra i ${name}?`,
          answer: `För att snabbt hitta och hyra ${Available[type_formatted]} i ${name} behöver du kontakta privata hyresvärdar som inte tillämpar bostadskö. Dessa privata hyresvärdar hittar du här på Bostadsval. Vi har lediga ${Plural[type_formatted]} från tusentals hyresvärdar.`,
        },
        {
          question: `Vilka typer av bostäder kan man hyra i ${name}?`,
          answer: `I ${name} kan man hyra [lägenheter](https://www.bostadsval.se/hyra-lagenhet/${city_formatted}), [hus](https://www.bostadsval.se/hyra-hus/${city_formatted}), [rum](https://www.bostadsval.se/hyra-rum/${city_formatted}) och [stugor](https://www.bostadsval.se/hyra-stuga/${city_formatted}). Du kan se alla lediga bostäder i ${name} [här](https://www.bostadsval.se/hyra-bostad/${city_formatted})!`,
        },
        {
          question: `Vilken är den bästa hemförsäkringen för ${Plural[type_formatted]} i ${name}?`,
          answer: `Den bästa hemförsäkringen just nu enligt redaktionen på Bostadsval är [Hedvig](https://www.bostadsval.se/blogg/maste-man-ha-hemforsakring). Hedvig erbjuder ett omfattande skydd till låga priser. Processen för att skapa konto är mycket smidig och eventuella försäkringsärenden hanteras snabbt. 25% av intäkterna går till Hedvig och 75% går till en gemensam skadepool. Eventuellt överskott doneras till välgörenhet i slutet av året.`,
        },
      ];

      /**
       * @description declare article
       */
      let article: string | undefined;

      /**
       * @description populate article variable depending on which type_formatted was passed
       */
      if (type_formatted === "bostad") {
        article = `## Hyr ${Pronoun[type_formatted]} nästa ${Singular[type_formatted]} i ${name} \n Här kan du hitta ${Pronoun[type_formatted]} nästa lediga ${Singular[type_formatted]} i ${name} att hyra! Vi har ett omfattande utbud på hela ${city.count} lediga ${Plural[type_formatted]} i ${name}. Gör som tusentals andra bostadssökande och hitta ${Pronoun[type_formatted]} nästa ${Singular[type_formatted]} genom Bostadsval. Vi samlar ${Singular[type_formatted]}-annonser från privata hyresvärdar landet över så att det ska bli så enkelt som möjligt för dig att hitta ${Pronoun[type_formatted]} nästa hyres${Singular[type_formatted]}. \n ## Så hittar du snabbt ${Pronoun[type_formatted]} nästa ${Singular[type_formatted]} \n För att öka dina chanser att hitta ${Specific[type_formatted]} ${Available[type_formatted]} ${Singular[type_formatted]} i ${name}, är det en bra idé att använda vår tjänst regelbundet och vara snabb med att hitta nya annonser som matchar dina preferenser. \n\n Oavsett om du är en blivande student, en familj som letar efter ${Specific[type_formatted]} större ${Singular[type_formatted]} eller bara behöver byta ${Singular[type_formatted]}, är ${name} en stad med möjligheter. Låt Bostadsval vara din partner i jakten på den perfekta bostaden i ${name}, och låt oss göra processen smidig och effektiv för dig. Sök igenom vårt omfattande utbud av hyres${Plural[type_formatted]} i ${name} idag och hitta ${Pronoun[type_formatted]} dröm${Singular[type_formatted]} här. \n ### Användarvänlig bostadssökning för din bekvämlighet \n Vår användarvänliga webbplats är utformad för att göra din bostadssökning så enkel och effektiv som möjligt. Med vårt kraftfulla söksystem kan du filtrera annonser enligt dina exakta kriterier. Sök efter prisintervall, antal rum, specifika bekvämligheter eller önskat område i ${name}. Detta sparar din tid och hjälper dig att hitta ${Singular[type_formatted]} som verkligen uppfyller dina önskemål. \n ## Hyr ut din ${Singular[type_formatted]} via Bostadsval \n Om du är en hyresvärd som har en ${Singular[type_formatted]} i ${name} som du vill hyra ut, kan du enkelt publicera din annons på vår plattform. Detta gör att potentiella hyresgäster enkelt kan hitta ${Pronoun[type_formatted]} ${Singular[type_formatted]} och kontakta dig direkt.`;
      } else {
        const seo = await this.citiesService.seo({
          type_formatted,
          city_formatted,
        });
        if (!seo || !seo.length) throw new BadRequestException();
        article = seo.find((item) => item.type_formatted === type_formatted)
          ?.seo;
      }
      /**
       * @description generate meta tags
       */
      const h1 = meta[type_formatted]["h1"](name);
      const title = meta[type_formatted]["title"](name, city.count);
      const description = meta[type_formatted]["description"](name);
      return {
        city: {
          ...city,
          h1,
          title,
          description,
        },
        faqs,
        article,
      };
    } else {
      /**
       * @description if there is not matching city or if the total average is undefined
       */
      const seo = await this.citiesService.seo({
        city_formatted,
      });
      /**
       * @description check if seo content is present
       */
      if (!seo || !seo.length) throw new BadRequestException();
      /**
       * @description proceed to generate SEO content
       */
      const name = seo[0].city[0].toUpperCase() + seo[0].city.slice(1);
      const faqs = [
        {
          question: `Hur hittar jag snabbast ${Property[type_formatted]} att hyra i ${name}?`,
          answer: `För att snabbt hitta och hyra ${Available[type_formatted]} i ${name} behöver du kontakta privata hyresvärdar som inte tillämpar bostadskö. Dessa privata hyresvärdar hittar du här på Bostadsval. Vi har lediga ${Plural[type_formatted]} från tusentals hyresvärdar.`,
        },
        {
          question: `Vilka typer av bostäder kan man hyra i ${name}?`,
          answer: `I ${name} kan man hyra [lägenheter](https://www.bostadsval.se/hyra-lagenhet/${city_formatted}), [hus](https://www.bostadsval.se/hyra-hus/${city_formatted}), [rum](https://www.bostadsval.se/hyra-rum/${city_formatted}) och [stugor](https://www.bostadsval.se/hyra-stuga/${city_formatted}). Du kan se alla lediga bostäder i ${name} [här](https://www.bostadsval.se/hyra-bostad/${city_formatted})!`,
        },
        {
          question: `Vilken är den bästa hemförsäkringen för ${Plural[type_formatted]} i ${name}?`,
          answer: `Den bästa hemförsäkringen just nu enligt redaktionen på Bostadsval är [Hedvig](https://www.bostadsval.se/blogg/maste-man-ha-hemforsakring). Hedvig erbjuder ett omfattande skydd till låga priser. Processen för att skapa konto är mycket smidig och eventuella försäkringsärenden hanteras snabbt. 25% av intäkterna går till Hedvig och 75% går till en gemensam skadepool. Eventuellt överskott doneras till välgörenhet i slutet av året.`,
        },
      ];

      let article: string | undefined;

      if (seo.some((item) => item.type_formatted === type_formatted)) {
        article = seo.find((item) => item.type_formatted === type_formatted)
          ?.seo;
      } else {
        article = `## Hyr ${Pronoun[type_formatted]} nästa ${Singular[type_formatted]} i ${name} \n Här kan du hitta ${Pronoun[type_formatted]} nästa lediga ${Singular[type_formatted]} i ${name} att hyra! Gör som tusentals andra bostadssökande och hitta ${Pronoun[type_formatted]} nästa ${Singular[type_formatted]} genom Bostadsval. Vi samlar ${Singular[type_formatted]}-annonser från privata hyresvärdar landet över så att det ska bli så enkelt som möjligt för dig att hitta ${Pronoun[type_formatted]} nästa hyres${Singular[type_formatted]}. \n ## Så hittar du snabbt ${Pronoun[type_formatted]} nästa ${Singular[type_formatted]} \n För att öka dina chanser att hitta ${Specific[type_formatted]} ${Available[type_formatted]} ${Singular[type_formatted]} i ${name}, är det en bra idé att använda vår tjänst regelbundet och vara snabb med att hitta nya annonser som matchar dina preferenser. \n\n Oavsett om du är en blivande student, en familj som letar efter ${Specific[type_formatted]} större ${Singular[type_formatted]} eller bara behöver byta ${Singular[type_formatted]}, är ${name} en stad med möjligheter. Låt Bostadsval vara din partner i jakten på den perfekta bostaden i ${name}, och låt oss göra processen smidig och effektiv för dig. Sök igenom vårt omfattande utbud av hyres${Plural[type_formatted]} i ${name} idag och hitta ${Pronoun[type_formatted]} dröm${Singular[type_formatted]} här. \n ### Användarvänlig bostadssökning för din bekvämlighet \n Vår användarvänliga webbplats är utformad för att göra din bostadssökning så enkel och effektiv som möjligt. Med vårt kraftfulla söksystem kan du filtrera annonser enligt dina exakta kriterier. Sök efter prisintervall, antal rum, specifika bekvämligheter eller önskat område i ${name}. Detta sparar din tid och hjälper dig att hitta ${Singular[type_formatted]} som verkligen uppfyller dina önskemål. \n ## Hyr ut din ${Singular[type_formatted]} via Bostadsval \n Om du är en hyresvärd som har en ${Singular[type_formatted]} i ${name} som du vill hyra ut, kan du enkelt publicera din annons på vår plattform. Detta gör att potentiella hyresgäster enkelt kan hitta ${Pronoun[type_formatted]} ${Singular[type_formatted]} och kontakta dig direkt.`;
      }

      const h1 = meta[type_formatted]["h1"](name);
      const title = meta[type_formatted]["title"](name, 0);
      const description = meta[type_formatted]["description"](name);
      return {
        city: {
          _id: null,
          count: 0,
          city: name,
          avg_price: 0,
          h1,
          title,
          description,
        },
        faqs,
        article,
      };
    }
  }

  @Get(":type_formatted")
  async findType(@Param("type_formatted") type_formatted: string) {
    /**
     * @description get total average of all cities
     */
    const total = (await this.citiesService.average({}))[0];
    const city = (
      await this.citiesService.city(
        type_formatted === "bostad" ? {} : { type_formatted },
      )
    )[0];
    /**
     * @description check if previous services are not undefined and check if previous services are not undefined
     */
    if (!city || !total || !typeZodSchema.safeParse(type_formatted).success)
      throw new BadRequestException();
    /**
     * @description since there is no city specified we default back to country
     */
    const name = "Sverige";
    /**
     * @description generate faq
     */
    const faqs = [
      {
        question: `Hur många lediga ${Plural[type_formatted]} finns det i ${name} just nu?`,
        answer: `Just nu finns det ${city.count} lediga ${Plural[type_formatted]} att hyra i ${name}.`,
      },
      {
        question: `Hur hittar jag snabbast ${Property[type_formatted]} att hyra i ${name}?`,
        answer: `För att snabbt hitta och hyra ${Available[type_formatted]} i ${name} behöver du kontakta privata hyresvärdar som inte tillämpar bostadskö. Dessa privata hyresvärdar hittar du här på Bostadsval. Vi har lediga ${Plural[type_formatted]} från tusentals hyresvärdar.`,
      },
      {
        question: `Vilka typer av bostäder kan man hyra i ${name}?`,
        answer: `I ${name} kan man hyra [lägenheter](https://www.bostadsval.se/hyra-lagenhet/), [hus](https://www.bostadsval.se/hyra-hus/), [rum](https://www.bostadsval.se/hyra-rum/) och [stugor](https://www.bostadsval.se/hyra-stuga/). Du kan se alla lediga bostäder i Sverige [här](https://www.bostadsval.se/hyra-bostad/)`,
      },
      {
        question: `Vilken är den bästa hemförsäkringen för ${Plural[type_formatted]} i ${name}?`,
        answer: `Den bästa hemförsäkringen just nu enligt redaktionen på Bostadsval är [Hedvig](https://www.bostadsval.se/blogg/maste-man-ha-hemforsakring). Hedvig erbjuder ett omfattande skydd till låga priser. Processen för att skapa konto är mycket smidig och eventuella försäkringsärenden hanteras snabbt. 25% av intäkterna går till Hedvig och 75% går till en gemensam skadepool. Eventuellt överskott doneras till välgörenhet i slutet av året.`,
      },
    ];
    /**
     * @description generate article
     */
    const article = `## Hyr ${Pronoun[type_formatted]} nästa ${Singular[type_formatted]} i ${name} \n Här kan du hitta ${Pronoun[type_formatted]} nästa lediga ${Singular[type_formatted]} i ${name} att hyra! Vi har ett omfattande utbud på hela ${city.count} lediga ${Plural[type_formatted]} i ${name}. Gör som tusentals andra bostadssökande och hitta ${Pronoun[type_formatted]} nästa ${Singular[type_formatted]} genom Bostadsval. Vi samlar ${Singular[type_formatted]}-annonser från privata hyresvärdar landet över så att det ska bli så enkelt som möjligt för dig att hitta ${Pronoun[type_formatted]} nästa hyres${Singular[type_formatted]}. \n ## Så hittar du snabbt ${Pronoun[type_formatted]} nästa ${Singular[type_formatted]} \n För att öka dina chanser att hitta ${Specific[type_formatted]} ${Available[type_formatted]} ${Singular[type_formatted]} i ${name}, är det en bra idé att använda vår tjänst regelbundet och vara snabb med att hitta nya annonser som matchar dina preferenser. \n\n Oavsett om du är en blivande student, en familj som letar efter ${Specific[type_formatted]} större ${Singular[type_formatted]} eller bara behöver byta ${Singular[type_formatted]}, är ${name} en stad med möjligheter. Låt Bostadsval vara din partner i jakten på den perfekta bostaden i ${name}, och låt oss göra processen smidig och effektiv för dig. Sök igenom vårt omfattande utbud av hyres${Plural[type_formatted]} i ${name} idag och hitta ${Pronoun[type_formatted]} dröm${Singular[type_formatted]} här. \n ### Användarvänlig bostadssökning för din bekvämlighet \n Vår användarvänliga webbplats är utformad för att göra din bostadssökning så enkel och effektiv som möjligt. Med vårt kraftfulla söksystem kan du filtrera annonser enligt dina exakta kriterier. Sök efter prisintervall, antal rum, specifika bekvämligheter eller önskat område i ${name}. Detta sparar din tid och hjälper dig att hitta ${Singular[type_formatted]} som verkligen uppfyller dina önskemål. \n ## Hyr ut din ${Singular[type_formatted]} via Bostadsval \n Om du är en hyresvärd som har en ${Singular[type_formatted]} i ${name} som du vill hyra ut, kan du enkelt publicera din annons på vår plattform. Detta gör att potentiella hyresgäster enkelt kan hitta ${Pronoun[type_formatted]} ${Singular[type_formatted]} och kontakta dig direkt.`;
    /**
     * @description generate meta tags
     */
    const h1 = meta[type_formatted]["h1"](name);
    const title = meta[type_formatted]["title"](name, city.count);
    const description = meta[type_formatted]["description"](name);
    return {
      type: {
        count: city.count,
        avg_price: city.avg_price,
        h1,
        title,
        description,
      },
      faqs,
      article,
    };
  }
}
