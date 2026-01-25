export enum SearchParams {
  CAR = "car",
  LOCATION = "location",
  LAT = "lat",
  LNG = "lng",
  CHECKIN = "checkin",
  CHECKOUT = "checkout",
  MIN_PRICE = "min-price",
  MAX_PRICE = "max-price",
  BODY_STYLE = "body-style",
  POWERTRAIN = "powertrain",
  MIN_SEATS = "min-seats",
  TRANSMISSION = "transmission",
  SERVICE_TYPE = "service-type", // self-drive or chauffeur
  LUXURY_CLASS = "luxury-class", // standard, premium, luxury, executive
}

export type ServiceType = "self-drive" | "chauffeur"
export type LuxuryClass = "standard" | "premium" | "luxury" | "executive"
