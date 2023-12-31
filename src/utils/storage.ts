export const meta = {
  bostad: {
    h1: (city: string) => `Hyra bostad i ${city}: Se alla lediga bostäder här!`,
    title: (city: string, properties: number) =>
      properties >= 15
        ? `Hyra bostad i ${city}: Se ${properties} lediga hyresbostäder`
        : `Hyra bostad i ${city}: Se alla lediga hyresbostäder`,
    description: (city: string) =>
      `Letar du efter en bostad att hyra i ${city}? Vi har ett stort utbud av lediga bostäder från privata hyresvärdar utan kö. Hitta din nästa hyresbostad via Bostadsval!`,
  },
  lagenhet: {
    h1: (city: string) =>
      `Hyra lägenhet i ${city}: Se alla lediga lägenheter här!`,
    title: (city: string, properties: number) =>
      properties >= 15
        ? `Hyra lägenhet i ${city}: Se ${properties} lediga hyreslägenheter`
        : `Hyra lägenhet i ${city}: Se alla lediga hyreslägenheter`,
    description: (city: string) =>
      `Letar du efter en lägenhet att hyra i ${city}? Vi har ett stort utbud av lediga lägenheter från privata hyresvärdar utan kö. Hitta din nästa hyreslägenhet via Bostadsval!`,
  },
  hus: {
    h1: (city: string) => `Hyra hus i ${city}: Se alla lediga hus här!`,
    title: (city: string, properties: number) =>
      properties >= 15
        ? `Hyra hus i ${city}: Se ${properties} lediga hus`
        : `Hyra hus i ${city}: Se alla lediga hus`,
    description: (city: string) =>
      `Letar du efter ett hus att hyra i ${city}? På Bostadsval har vi ett brett urval av lediga hus till uthyres. Kika här på Bostadsval och hitta ditt nästa hus att hyra!`,
  },
  stuga: {
    h1: (city: string) => `Hyra stuga i ${city}: Se alla lediga stugor här!`,
    title: (city: string, properties: number) =>
      properties >= 15
        ? `Hyra stuga i ${city}: Se ${properties} lediga stugor`
        : `Hyra stuga i ${city}: Se alla lediga stugor`,
    description: (city: string) =>
      `Letar du efter en stuga att hyra i ${city}? Vi har ett brett utbud av stugor, oavsett om du vill bo nära vattnet, på västkusten eller i fjällen! Hyr idag via Bostadsval!`,
  },
  rum: {
    h1: (city: string) => `Hyra rum i ${city}: Se alla lediga rum här!`,
    title: (city: string, properties: number) =>
      properties >= 15
        ? `Hyra rum i ${city}: Se ${properties} lediga rum`
        : `Hyra rum i ${city}: Se alla lediga rum`,
    description: (city: string) =>
      `Letar du efter ett rum att hyra i ${city}? Vi har ett brett utbud av lediga rum som hyrs ut. Bli inneboende idag och hitta ditt nästa rum att hyra här!`,
  },
} as const;
