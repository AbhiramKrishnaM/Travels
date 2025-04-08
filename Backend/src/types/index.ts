export type User = {
  id: number;
  name: string | null;
  email: string;
  password: string | null;
  created_at: Date;
};

export type TouristPlace = {
  id: number;
  name: string;
  location: string;
  description: string | null;
  image_url: string | null;
};

export type Hotel = {
  id: number;
  name: string;
  address: string;
  description: string | null;
  amenities: string | null;
  price_per_night: number;
  place_id: number;
  tourist_place?: TouristPlace;
};

export type Booking = {
  id: number;
  user_id: number;
  hotel_id: number;
  check_in_date: Date;
  check_out_date: Date;
  total_price: number;
  status: string;
  created_at: Date;
  user?: User;
  hotel?: Hotel;
  guests?: GuestDetail[];
};

export type GuestDetail = {
  id: number;
  booking_id: number;
  name: string;
  aadhaar_no: string;
  is_primary: boolean;
  booking?: Booking;
};
