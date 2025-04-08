export interface TouristPlace {
  id: number;
  name: string;
  location: string;
  description: string;
  image_url: string;
}

export interface Hotel {
  id: number;
  name: string;
  address: string;
  description: string;
  amenities: string;
  price_per_night: string;
  tourist_place: TouristPlace;
}
